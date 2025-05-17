import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			forest: {
  				text: '#FFC857',
  				tileFront: {
  					from: '#274156',
  					to: '#3B6978'
  				},
  				hover: '#3FD1FF'
  			},
  			cold: {
  				text: 'rgb(191 219 254)',
  				tileFront: {
  					from: 'rgb(147 197 253)',
  					via: 'rgb(219 234 254)',
  					to: 'rgb(239 246 255)'
  				},
  				hover: 'white'
  			},
  			underwater: {
  				text: 'rgb(34 211 238)',
  				tileFront: {
  					from: 'rgb(30 64 175)',
  					via: 'rgb(15 118 110)',
  					to: 'rgb(6 182 212)'
  				},
  				hover: 'rgb(94 234 212)'
  			},
  			halloween: {
  				text: 'rgb(250 204 21)',
  				tileFront: {
  					from: 'rgb(254 240 138)',
  					via: 'rgb(253 186 116)',
  					to: 'rgb(248 113 113)'
  				},
  				hover: 'rgb(94 234 212)'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			nature: "url('/assets/background/Nature.jpg')",
  			snow: "url('/assets/background/Snow.jpg')",
  			underwater: "url('/assets/background/Underwater.jpg')",
  			halloween: "url('/assets/background/Halloween.jpg')"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;