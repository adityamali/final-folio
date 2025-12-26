'use client'
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full min-h-[70vh] md:min-h-[90vh] flex flex-col justify-center px-2 md:px-12 lg:px-20 py-12 md:py-20 overflow-hidden bg-cream text-charcoal">
            
            {/* Decorative "Fold" lines or poster creases could go here */}
            
            <div className="w-full mx-auto relative z-10 overflow-hidden">
                
                {/* Top Billing / Presents */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-4 md:mb-8"
                >
                    <p className="font-display uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-base text-charcoal/60">
                        Portfolio & Case Studies
                    </p>
                </motion.div>

                {/* Main Title - Movie Title Style */}
                <div className="relative text-center">
                    <motion.h1 
                        className="font-display text-[clamp(2rem,10vw,6rem)] md:text-[12vw] leading-[0.8] uppercase text-orange drop-shadow-[4px_4px_0px_rgba(45,45,45,1)] md:drop-shadow-[8px_8px_0px_rgba(45,45,45,1)] break-words"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Aditya<br/>Mali
                    </motion.h1>
                    
                    {/* Floating Badge */}
                    <motion.div 
                        className="absolute -top-2 right-0 sm:top-0 sm:right-[10%] md:right-[20%] rotate-12 bg-teal text-cream p-2 md:p-6 rounded-full border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro z-20"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 12 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <p className="font-accent text-[10px] md:text-2xl leading-none text-center whitespace-nowrap">
                            Open to<br/>Work!
                        </p>
                    </motion.div>
                </div>

                {/* Subtitle / Tagline */}
                <motion.div 
                    className="mt-8 md:mt-12 text-center max-w-4xl mx-auto px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="font-display text-xl sm:text-2xl md:text-5xl uppercase text-charcoal leading-tight break-words">
                        Building <span className="text-teal underline decoration-2 md:decoration-4 decoration-mustard underline-offset-2 md:underline-offset-4 break-words">Digital Products</span> That Scale
                    </h2>
                </motion.div>

                {/* CTAs */}
                <motion.div 
                    className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 px-2 md:px-4 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-charcoal text-cream font-display uppercase text-sm md:text-xl tracking-wider border-2 border-transparent hover:bg-orange hover:text-charcoal hover:border-charcoal hover:shadow-retro transition-all text-center whitespace-nowrap"
                    >
                        Let&apos;s Collaborate
                    </Link>
                    <Link
                        href="/cafe"
                        className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent text-charcoal font-display uppercase text-sm md:text-xl tracking-wider border-2 md:border-4 border-charcoal hover:bg-teal hover:text-cream hover:shadow-retro transition-all text-center whitespace-nowrap"
                    >
                        View Portfolio
                    </Link>
                </motion.div>

                {/* Billing Block - Credits Style */}
                <motion.div 
                    className="mt-8 md:mt-16 border-t-2 md:border-t-4 border-b-2 md:border-b-4 border-charcoal py-4 md:py-8 px-2 md:px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center font-display uppercase tracking-widest text-[10px] md:text-sm text-charcoal/80">
                        <div>
                            <span className="block text-[8px] md:text-[10px] text-charcoal/50 mb-1">Role</span>
                            <span className="hidden sm:inline">Frontend & Backend</span>
                            <span className="sm:hidden">Full Stack</span>
                        </div>
                        <div>
                            <span className="block text-[8px] md:text-[10px] text-charcoal/50 mb-1">Based In</span>
                            The Internet
                        </div>
                        <div>
                            <span className="block text-[8px] md:text-[10px] text-charcoal/50 mb-1">Tech</span>
                            React • Node • Next
                        </div>
                        <div>
                            <span className="block text-[8px] md:text-[10px] text-charcoal/50 mb-1">Experience</span>
                            3+ Years
                        </div>
                    </div>
                </motion.div>

                {/* Review Quote */}
                <motion.div 
                    className="mt-8 md:mt-16 text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="font-accent text-base md:text-2xl text-mustard rotate-[-2deg] break-words">
                        &ldquo;Clean Code. Fast Delivery. Real Results.&rdquo;
                    </p>
                    {/* <p className="font-mono text-xs uppercase mt-2 text-charcoal/60">- Senior Tech Lead, Fortune 500</p> */}
                </motion.div>

            </div>
        </section>
    );
}
