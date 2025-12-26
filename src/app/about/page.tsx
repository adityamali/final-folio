"use client";
import { Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";

const AboutPage: NextPage = () => {
    return (
        <div className="min-h-screen bg-cream text-charcoal pb-20">
            {/* Header Section */}
            <div className="pt-8 pb-8 px-6 max-w-7xl mx-auto">
                <div className="border-b-4 border-charcoal pb-8">
                    <h1 className="font-display text-5xl md:text-7xl uppercase text-orange drop-shadow-md tracking-tight mb-4">
                        About Me
                    </h1>
                    <p className="font-accent text-2xl md:text-3xl text-teal -rotate-1 max-w-2xl">
                        Full Stack Developer passionate about building digital experiences that matter.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <section id="work" className="py-8 md:py-12">
                    <Projects />
                </section>

                <section className="py-8 md:py-12 bg-mustard/10 -mx-6 px-6 border-y-4 border-charcoal my-8">
                    <div className="max-w-7xl mx-auto">
                        <Skills />
                    </div>
                </section>

                <section id="contact" className="py-8 md:py-12">
                    <Contact />
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
