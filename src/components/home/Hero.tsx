'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 md:px-12 lg:px-16 py-20 overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
            
            <div className="max-w-6xl w-full mx-auto relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        className="flex flex-col items-start space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Status Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2.5 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground border border-border"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-muted-foreground">Available for new projects</span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="block text-foreground">Hi, I'm</span>
                                <span className="block mt-2 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                                    Aditya Mali
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                                Full Stack Developer & UI/UX Enthusiast
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                            I craft accessible, performant, and pixel-perfect web experiences. 
                            Passionate about building tools that make a difference and contributing to open source.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95"
                            >
                                Get in Touch
                                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:scale-105 active:scale-95"
                            >
                                View Work
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border w-full max-w-lg">
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-foreground">20+</div>
                                <div className="text-sm text-muted-foreground">Projects</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-foreground">3+</div>
                                <div className="text-sm text-muted-foreground">Years Exp.</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-foreground">15+</div>
                                <div className="text-sm text-muted-foreground">Articles</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        className="relative flex justify-center lg:justify-end"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 via-foreground/10 to-foreground/5 rounded-3xl blur-3xl opacity-50"></div>
                            
                            {/* Image container */}
                            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-muted">
                                <Image
                                    src="/me.jpeg"
                                    alt="Aditya Mali"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
