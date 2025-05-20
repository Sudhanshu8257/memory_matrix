"use client";

import { useState } from "react";
import {
  Play,
  Menu,
  X
} from "lucide-react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const difficulties = [
  { name: "Easy", grid: "4x3", color: "bg-green-500" },
  { name: "Medium", grid: "5x4", color: "bg-yellow-500" },
  { name: "Hard", grid: "6x5", color: "bg-red-500" },
];


const faqs = [
  {
    question: "How do I play Memory Quest?",
    answer: "Memory Quest is a classic memory matching game. Click tiles to reveal what's underneath, then try to find matching pairs. Clear the board by matching all pairs before time runs out!"
  },
  {
    question: "How do I change the theme of the game?",
    answer: "You can select from four different themes (Underwater, Nature, Snow, and Halloween) from the game settings before starting a new game. Each theme features unique visuals and sounds!"
  },
  {
    question: "Can I adjust the difficulty level?",
    answer: "Yes! Memory Quest offers three difficulty levels: Easy (4×3 grid), Medium (5×4 grid), and Hard (6×5 grid). Choose the one that best suits your skill level."
  },
  {
    question: "Is Memory Quest suitable for children?",
    answer: "Absolutely! Memory Quest is designed for players of all ages. It's a great game for improving memory, concentration, and cognitive skills for both children and adults."
  },
  {
    question: "Does Memory Quest work on mobile devices?",
    answer: "Yes, Memory Quest is fully responsive and works on smartphones, tablets, and desktop computers. Enjoy the game anywhere, anytime!"
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900">
      {/* Navigation */}
      <nav className="bg-amber-900 text-amber-50 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-100">Memory Quest</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="hover:text-yellow-300 transition-colors">Features</Link>
            <Link href="#themes" className="hover:text-yellow-300 transition-colors">Themes</Link>
            <Link href="#difficulty" className ="hover:text-yellow-300 transition-colors">Difficulty</Link>
            <Link href="#benefits" className="hover:text-yellow-300 transition-colors">Benefits</Link>
            <Link href="#faqs" className="hover:text-yellow-300 transition-colors">FAQs</Link>
            <Link href="https://portfolio-black-two-36.vercel.app/" className="hover:text-yellow-300 transition-colors">About Me</Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-amber-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-amber-800 mt-4 py-4 px-6 space-y-4"
          >
            <Link href="#features" className="block hover:text-yellow-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="#themes" className="block hover:text-yellow-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>Themes</Link>
            <Link href="#difficulty" className="block hover:text-yellow-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>Difficulty</Link>
            <Link href="#benefits" className="block hover:text-yellow-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>Benefits</Link>
            <Link href="#faqs" className="block hover:text-yellow-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-900 to-amber-800 text-amber-50 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Challenge Your Memory
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-amber-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Test your recall skills with Memory Quest, the ultimate memory matching game with multiple themes and difficulty levels.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href={"/game"}  className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 w-fit font-bold py-3 px-8 rounded-full flex items-center transition-colors">
                <Play className="mr-2" size={20} />
                Play Now
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2 max-lg:hidden">
            <motion.div 
              className="bg-amber-800 p-6 rounded-lg shadow-xl border-4 border-amber-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-4 gap-4">
                {Array(12).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-amber-600 rounded-md shadow-md hover:bg-amber-500 transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-amber-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Game Features</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Themes</h3>
              <p className="text-amber-800">Choose from four exciting themes: Underwater, Nature, Snow, and Halloween. Each theme offers unique visuals and sound effects.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Difficulty Levels</h3>
              <p className="text-amber-800">Challenge yourself with three difficulty levels: Easy (4×3), Medium (5×4), or Hard (6×5). Perfect for all skill levels.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Time Challenge</h3>
              <p className="text-amber-800">Race against the clock to find all matching pairs. Track your best times and challenge yourself to beat your records.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Exciting Themes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {themes.map((theme, index) => (
              <motion.div 
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-tr from-amber-700 to-amber-500 aspect-square flex flex-col items-center justify-center p-6">
                  <div className="text-amber-50 text-6xl mb-4">
                    {theme.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-amber-50">{theme.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 font-bold py-2 px-4 rounded">
                    Select Theme
                  </button>
                </div>
              </motion.div>
            ))} */}
             <div
              // onClick={() => handleThemeSelect("underwater")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative underwater rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-cyan-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">🐠</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  UNDERWATER
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Match sea creatures in ocean depths
                </p>
              </div>
            </div>

            <div
              // onClick={() => handleThemeSelect("forest")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative nature rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-emerald-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">🌿</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  NATURE
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Discover wildlife hidden in lush landscapes
                </p>
              </div>
            </div>

            <div
              // onClick={() => handleThemeSelect("cold")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative snow rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-emerald-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">❄️</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  SNOW
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Find matching pairs in a frosty wonderland
                </p>
              </div>
            </div>

            <div
              // onClick={() => handleThemeSelect("halloween")}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative halloween rounded-xl p-8 border-4 border-amber-900 shadow-lg shadow-emerald-900/50 w-[306px] h-[290px] flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-70 backdrop-blur-sm" />
                <div className="text-[56px] mb-4 z-[2]">🎃</div>
                <h2 className="text-3xl font-bold z-[2] text-cyan-100 tracking-wider mb-1 text-center drop-shadow-lg">
                  HALLOWEEN
                </h2>
                <p className="text-center z-[2] text-blue-100 text-sm">
                  Match spooky creatures in a haunted world
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Section */}
      <section id="difficulty" className="py-20 px-6 bg-gradient-to-b from-amber-200 to-amber-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Choose Your Challenge</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {difficulties.map((level, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`p-6 ${level.color} text-white`}>
                  <h3 className="text-2xl font-bold">{level.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-lg mb-4"><strong>Grid Size:</strong> {level.grid}</p>
                  <p className="text-amber-800 mb-6">
                    {level.name === "Easy" && "Perfect for beginners or quick gameplay sessions."}
                    {level.name === "Medium" && "A balanced challenge for experienced players."}
                    {level.name === "Hard" && "The ultimate test for memory masters!"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-amber-800 text-amber-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Benefits of Memory Games</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-yellow-500 text-amber-900 w-10 h-10 rounded-full flex items-center justify-center mr-3">1</span>
                Improved Concentration
              </h3>
              <p className="text-amber-200 text-lg ml-14">Memory games like Memory Quest help enhance focus and attention to detail, training your brain to concentrate better on tasks.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-yellow-500 text-amber-900 w-10 h-10 rounded-full flex items-center justify-center mr-3">2</span>
                Enhanced Memory
              </h3>
              <p className="text-amber-200 text-lg ml-14">Regular play strengthens short-term memory and recall abilities, helping you remember information better in daily life.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-yellow-500 text-amber-900 w-10 h-10 rounded-full flex items-center justify-center mr-3">3</span>
                Cognitive Development
              </h3>
              <p className="text-amber-200 text-lg ml-14">Memory games stimulate various brain functions, promoting neural pathway growth and cognitive flexibility.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-yellow-500 text-amber-900 w-10 h-10 rounded-full flex items-center justify-center mr-3">4</span>
                Stress Reduction
              </h3>
              <p className="text-amber-200 text-lg ml-14">Engaging with memory games provides a welcome mental break, helping to reduce stress and promote relaxation while remaining mentally active.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-amber-900 text-amber-50 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Challenge Your Memory?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 text-amber-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Start playing Memory Quest now and put your memory skills to the test with our engaging themes and multiple difficulty levels!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href={"/game"} className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 font-bold py-4 px-10 rounded-full text-xl transition-colors">
              Play Memory Quest Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-20 px-6 bg-amber-50">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border border-amber-200 rounded-lg mb-2 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-4 font-bold text-lg hover:bg-amber-100 hover:no-underline transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-4 text-amber-800">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-200 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-amber-50 mb-4">Memory Quest</h3>
              <p className="mb-4">Challenge your memory with our exciting match-finding game!</p>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-200 hover:text-amber-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-amber-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-amber-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-50 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-amber-50 transition-colors">Features</a></li>
                <li><a href="#themes" className="hover:text-amber-50 transition-colors">Themes</a></li>
                <li><a href="#difficulty" className="hover:text-amber-50 transition-colors">Difficulty Levels</a></li>
                <li><a href="#benefits" className="hover:text-amber-50 transition-colors">Benefits</a></li>
                <li><a href="#faqs" className="hover:text-amber-50 transition-colors">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-50 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-50 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-amber-50 transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-amber-50 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-50 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-50 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <a href="mailto:lohanasudhanshu@gmail.com" className="hover:text-amber-50 transition-colors">lohanasudhanshu@gmail.com</a>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <a href="#" className="hover:text-amber-50 transition-colors">Help Center</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-amber-800 text-center">
            <p>&copy; {new Date().getFullYear()} Memory Quest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}