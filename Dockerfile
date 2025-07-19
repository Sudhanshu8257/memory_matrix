# syntax=docker.io/docker/dockerfile:1
# Specifies the Dockerfile syntax version to use.
# Enables advanced features like cache mounts, BuildKit enhancements, and better syntax validation.
# Ensures compatibility with modern Docker tooling

# Use the latest Dockerfile syntax for advanced features like cache mounts and BuildKit

# Base stage - Common foundation for all subsequent stages
# Using Node.js 22 with Alpine Linux for smaller image size and better security
FROM node:22-alpine AS base

# ================================
# DEPENDENCIES STAGE
# ================================
# This stage installs production dependencies only
# Separated to leverage Docker layer caching - dependencies change less frequently than source code
FROM base AS deps

# Install libc6-compat for compatibility with some npm packages that expect glibc
# Alpine uses musl libc, but some packages are compiled against glibc TO AVOID CONFLICTS ON NPM PACKAGES AND TUN THINGS SMOOTHLY
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

# Set working directory for all subsequent commands
WORKDIR /app

# Copy package manager files to leverage Docker layer caching
# Only copy package files first - if source code changes but dependencies don't,
# this layer can be reused from cache
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the package manager used in the project
# Using frozen lockfiles to ensure reproducible builds
# Exit with error if no lockfile is found to prevent inconsistent dependency resolution
RUN \
  if [ -f yarn.lock ]; then \
    echo "Installing dependencies with Yarn..." && \
    yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    echo "Installing dependencies with npm..." && \
    npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Installing dependencies with pnpm..." && \
    corepack enable pnpm && \
    pnpm i --frozen-lockfile; \
  else \
    echo "❌ Error: No lockfile found. Please commit your package-lock.json, yarn.lock, or pnpm-lock.yaml" && \
    exit 1; \
  fi

# ================================
# BUILD STAGE
# ================================
# This stage builds the Next.js application
# Separated from deps to enable parallel building in multi-stage builds
FROM base AS builder

WORKDIR /app

# Copy installed dependencies from the deps stage
# This avoids reinstalling dependencies and leverages the cached layer
COPY --from=deps /app/node_modules ./node_modules

# Copy all source code and configuration files
# This happens after dependency installation to maximize cache efficiency
COPY . .

# Disable Next.js telemetry during build for:
# - Faster build times (no network calls)
# - Privacy compliance
# - Consistent builds in CI/CD environments
# Learn more: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application based on the package manager
# The build process:
# 1. Compiles TypeScript/JavaScript
# 2. Optimizes and bundles client-side code
# 3. Generates static assets
# 4. Creates server-side code for API routes and SSR
RUN \
  if [ -f yarn.lock ]; then \
    echo "Building with Yarn..." && \
    yarn run build; \
  elif [ -f package-lock.json ]; then \
    echo "Building with npm..." && \
    npm run build; \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Building with pnpm..." && \
    corepack enable pnpm && \
    pnpm run build; \
  else \
    echo "❌ Error: No lockfile found for build step" && \
    exit 1; \
  fi

# ================================
# PRODUCTION RUNTIME STAGE
# ================================
# This is the final stage that creates the production image
# It only includes the necessary files to run the application
FROM base AS runner

WORKDIR /app

# Set environment to production
# This affects Next.js behavior:
# - Enables optimizations
# - Disables development features
# - Changes logging levels
ENV NODE_ENV=production

# Disable telemetry in production for privacy and performance
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security best practices
# Running as root in containers is a security risk
# Using system group/user IDs that don't conflict with host system
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets from the builder stage
# These are served directly by the web server without processing
COPY --from=builder /app/public ./public

# Copy the standalone build output with proper ownership
# Next.js standalone output includes:
# - Optimized server code
# - Only necessary dependencies
# - Pre-built pages and API routes
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files generated during build (CSS, JS, images)
# These are referenced by the HTML and need to be served by the app
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user before running the application
# This limits the potential damage if the container is compromised
USER nextjs

# Expose the port that the application will listen on
# This is for documentation and tooling - doesn't actually publish the port
EXPOSE 3000

# Set the port environment variable
# Next.js standalone server reads this to determine which port to bind to
ENV PORT=3000

# Set hostname to bind to all interfaces
# "0.0.0.0" allows connections from outside the container
# Default "localhost" would only accept connections from within the container
ENV HOSTNAME="0.0.0.0"

# Add health check to monitor application status
# This helps orchestrators (Docker Compose, Kubernetes) determine if the container is healthy
# Adjust the endpoint based on your application's health check route
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the Next.js production server
# server.js is generated by Next.js during the build process when using standalone output
# It includes the entire application and only necessary dependencies
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]