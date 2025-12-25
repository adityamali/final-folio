"use client";
import { Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";

const AboutPage: NextPage = () => {
    return (
        <div className="flex flex-col w-full bg-cream">
            <section className="w-full px-6 md:px-12 py-24 border-b-4 border-charcoal">
                <div className="mx-auto max-w-4xl">
                    <h1 className="font-display text-5xl md:text-6xl uppercase mb-8 text-charcoal drop-shadow-md">About Me</h1>
                    <p className="font-body text-xl md:text-2xl text-charcoal/80 mb-12 leading-relaxed max-w-3xl">
                        I&apos;m a Full Stack Developer passionate about building digital experiences that matter.
                        Here&apos;s a look at my work, the technologies I use, and how to get in touch.
                    </p>
                </div>
            </section>

            <section id="work" className="w-full px-6 md:px-12 py-24 border-b-4 border-charcoal">
                <div className="mx-auto max-w-7xl">
                    <Projects />
                </div>
            </section>

            <section className="w-full px-6 md:px-12 py-24 bg-mustard/10 border-b-4 border-charcoal">
                <div className="mx-auto max-w-6xl">
                    <Skills />
                </div>
            </section>

            <section id="contact" className="w-full px-6 md:px-12 py-24">
                <div className="mx-auto max-w-4xl">
                    <Contact />
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
