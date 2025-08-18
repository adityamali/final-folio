"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send, Copy, Phone, Check } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hello@adityamali.com";
  const phone = "+91-7709953054";

  const socialLinks = useMemo(
    () => [
      { name: "GitHub", icon: <i className="fab fa-github w-5 h-5" />, url: "https://github.com/adityamali", color: "hover:text-[#333]" },
      { name: "LinkedIn", icon: <i className="fab fa-linkedin w-5 h-5" />, url: "https://linkedin.com/in/adityamali2003", color: "hover:text-[#0077b5]" },
      { name: "Twitter", icon: <i className="fab fa-twitter w-5 h-5" />, url: "https://twitter.com/theadityamali", color: "hover:text-[#1DA1F2]" },
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
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs text-foreground/70">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Let’s work together
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold">Get in touch</h2>
        <p className="text-foreground/60 text-base max-w-2xl">
          Have a project in mind or a problem to solve? I’m open to freelance and full‑time opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-6 items-stretch">
        {/* Primary CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="md:col-span-2 rounded-2xl border border-border bg-background/60 backdrop-blur p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold">Start a conversation</h3>
            <p className="text-foreground/60 mt-1">Tell me a bit about your goals and timeline.</p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white px-5 py-3 text-sm hover:brightness-110 transition"
            >
              <Send className="w-4 h-4" /> Email me
            </a>
            <button
              type="button"
              onClick={() => handleCopy(email)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:border-primary/60 hover:bg-primary/5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy email
            </button>
          </div>
        </motion.div>

        {/* Details card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="md:col-span-3 rounded-2xl border border-border bg-background/60 backdrop-blur p-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-foreground/60">Phone</div>
                <a
                  href={`tel:${phone}`}
                  className="mt-1 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary/60 hover:bg-primary/5 transition"
                >
                  <Phone className="w-4 h-4" /> {phone}
                </a>
              </div>
              <div>
                <div className="text-xs text-foreground/60">Availability</div>
                <ul className="mt-1 grid grid-cols-1 gap-2 text-sm text-foreground/70">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Freelance projects</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Full‑time roles</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Technical consulting</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-foreground/60">Social</div>
                <div className="mt-1 grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:scale-[1.02] transition ${link.color}`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-foreground/60">Response time</div>
                <div className="mt-1 text-sm text-foreground/70">Typically within 24–48 hours.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
