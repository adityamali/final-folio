"use client";
import React, { useState, useMemo } from "react";
import { Github, Linkedin, Twitter, ExternalLink, Send, Check, Copy, Phone } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hello@adityamali.com";
  const phone = "+91-7709953054";

  const socialLinks = useMemo(
    () => [
      { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com/adityamali", color: "bg-charcoal text-cream" },
      { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/adityamali2003", color: "bg-teal text-cream" },
      { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com/theadityamali", color: "bg-orange text-cream" },
    ],
    []
  );

  const handleCopy = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // no-op
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl">
      <div className="flex flex-col gap-3 md:gap-4 border-b-2 md:border-b-4 border-charcoal pb-3 md:pb-4">
        <h2 className="font-display text-3xl md:text-4xl uppercase text-charcoal drop-shadow-md">Get in Touch</h2>
        <p className="font-body text-base md:text-lg text-charcoal/70 max-w-2xl">
          Have a project in mind or a problem to solve? I&apos;m open to freelance and full‑time opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Contact Card */}
        <div className="border-2 md:border-4 border-charcoal bg-mustard p-6 md:p-8 shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-charcoal">
            <h3 className="font-display text-xl md:text-2xl uppercase text-charcoal">Contact Info</h3>
            <p className="font-body text-xs md:text-sm text-charcoal/70 mt-1">Reach out directly via email or phone.</p>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-charcoal text-cream border-2 border-charcoal flex-shrink-0">
                <Send size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body text-xs uppercase tracking-wider text-charcoal/60 mb-1">Email</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={`mailto:${email}`} className="font-body font-semibold text-sm md:text-base text-charcoal hover:text-teal transition-colors break-all">
                    {email}
                  </a>
                  <button 
                    onClick={() => handleCopy(email)} 
                    className="text-charcoal hover:text-orange transition-colors p-1 border-2 border-charcoal hover:bg-cream flex-shrink-0"
                    aria-label="Copy email"
                  >
                    {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-charcoal text-cream border-2 border-charcoal flex-shrink-0">
                <Phone size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
              </div>
              <div className="flex-1">
                <div className="font-body text-xs uppercase tracking-wider text-charcoal/60 mb-1">Phone</div>
                <a href={`tel:${phone}`} className="font-body font-semibold text-sm md:text-base text-charcoal hover:text-teal transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Socials Card */}
        <div className="border-2 md:border-4 border-charcoal bg-teal p-6 md:p-8 shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-charcoal">
            <h3 className="font-display text-xl md:text-2xl uppercase text-cream">Social Profiles</h3>
            <p className="font-body text-xs md:text-sm text-cream/80 mt-1">Connect with me on social media.</p>
          </div>

          <div className="grid grid-cols-1 gap-2 md:gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 md:gap-3 p-3 md:p-4 border-2 border-charcoal ${link.color} hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] transition-all group`}
              >
                <div className="group-hover:scale-110 transition-transform flex-shrink-0">
                  {link.icon}
                </div>
                <span className="font-body font-semibold text-xs md:text-sm uppercase tracking-wide">{link.name}</span>
                <ExternalLink className="ml-auto w-3 h-3 md:w-4 md:h-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
