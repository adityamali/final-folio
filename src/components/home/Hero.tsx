import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden">

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
                {/* Left: Content */}
                <motion.div
                    className="flex flex-col items-start gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF00]"></span>
                        </span>
                        Available for freelance work
                    </motion.div>

                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                            Hi, I’m <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Aditya Mali
                            </span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                            Full Stack Developer & UI/UX Enthusiast
                        </h2>
                    </div>

                    <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-lg">
                        I build accessible, pixel-perfect, and performant web experiences.
                        Passionate about open source and creating tools that help others.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center rounded-lg p-[1px] transition-all"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity rounded-lg" />
                            <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-background px-6 py-3 transition-colors group-hover:bg-background/90">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-semibold whitespace-nowrap">
                                    Let&apos;s Build Stuff Together
                                </span>
                            </div>
                        </Link>
                        <Link
                            href="/projects"
                            className="px-6 py-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            View Work
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border w-full">
                        <div>
                            <div className="text-2xl font-bold text-foreground">20+</div>
                            <div className="text-sm text-muted-foreground">Projects</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">3+</div>
                            <div className="text-sm text-muted-foreground">Years Exp.</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">15+</div>
                            <div className="text-sm text-muted-foreground">Articles</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Image */}
                <motion.div
                    className="relative flex justify-center md:justify-end"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-3xl rotate-6 opacity-20 blur-2xl"></div>
                        <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-border shadow-2xl bg-background">
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
        </section>
    );
}
