"use client";
import { Blogs, Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Page: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-36">

      <section id="hero" className="relative w-full h-screen px-4 md:px-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <motion.div
            className="flex flex-col items-start gap-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="h-full w-full bg-black/90 blur-lg" />
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs text-foreground/70"
              data-cursor="block"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />{" "}
              Available for freelance work
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              Hi, I’m <span className="text-primary">Aditya Mali</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">I build delightful web experiences</span>
            </motion.h1>

            <motion.p
              className="max-w-xl text-foreground/60"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
            >
              Full‑stack developer focused on performant, accessible, and polished products. I help startups and teams ship fast without sacrificing quality.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 pt-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4 }}
            >
              <Link href="/registration-form" className="rounded-full px-6 py-3 bg-primary text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all" data-cursor="block">
                Hire me
              </Link>
              <Link href="#work" className="rounded-full px-6 py-3 border border-border hover:border-primary/60 hover:bg-primary/5 transition-all" data-cursor="block">
                View projects
              </Link>
            </motion.div>

            {/* Social proof / Stats */}
            <motion.div
              className="mt-6 grid grid-cols-3 gap-4 text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.28 },
                },
              }}
            >
              <motion.div
                className="rounded-xl border border-border bg-background/60 px-4 py-3"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-2xl font-bold">20+</div>
                <div className="text-xs text-foreground/60">Projects</div>
              </motion.div>
              <motion.div
                className="rounded-xl border border-border bg-background/60 px-4 py-3"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-2xl font-bold">3+</div>
                <div className="text-xs text-foreground/60">Years</div>
              </motion.div>
              <motion.div
                className="rounded-xl border border-border bg-background/60 px-4 py-3"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs text-foreground/60">Articles</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            className="relative flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* glow */}
            <motion.div
              className="absolute -inset-6 md:-inset-8 rounded-full bg-gradient-to-tr from-primary/20 via-pink-500/10 to-transparent blur-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />

            <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-primary to-pink-500">
              <div className="rounded-full bg-background p-1">
                <Image
                  src="/me.jpeg"
                  alt="Portrait of Aditya Mali"
                  width={260}
                  height={260}
                  className="aspect-square object-cover rounded-full"
                  data-cursor="block"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="flex flex-col gap-4 w-full 2lg:w-[75vw] px-4 md:px-20 pb-40">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Projects />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[50vw] px-4 md:px-20 pb-40">
        <Skills />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[75vw] px-4 py-16 md:p-20 bg-gray-100 dark:bg-[#111111]">
        <Blogs />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full bg-gray-200 dark:bg-[#1e1e1e] px-4 py-16 md:p-20">
        <Contact />
      </section>
    </div>
  );
};

export default Page;