"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send, Copy, Phone, Check, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hello@adityamali.com";
  const phone = "+91-7709953054";

  const socialLinks = useMemo(
    () => [
      { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com/adityamali", color: "hover:text-foreground" },
      { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/adityamali2003", color: "hover:text-[#0077b5]" },
      { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com/theadityamali", color: "hover:text-[#1DA1F2]" },
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
    <div className="flex flex-col gap-8 w-full max-w-5xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Get in touch</h2>
        <p className="text-muted-foreground max-w-2xl">
          Have a project in mind or a problem to solve? I’m open to freelance and full‑time opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Card */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold mb-1">Contact Info</h3>
            <p className="text-sm text-muted-foreground">Reach out directly via email or phone.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Send size={18} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="flex items-center gap-2">
                  <a href={`mailto:${email}`} className="font-medium hover:text-primary transition-colors">
                    {email}
                  </a>
                  <button onClick={() => handleCopy(email)} className="text-muted-foreground hover:text-foreground transition-colors">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Phone</div>
                <a href={`tel:${phone}`} className="font-medium hover:text-primary transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Socials Card */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold mb-1">Social Profiles</h3>
            <p className="text-sm text-muted-foreground">Connect with me on social media.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
              >
                <div className={`text-muted-foreground group-hover:text-foreground transition-colors`}>
                  {link.icon}
                </div>
                <span className="font-medium text-sm">{link.name}</span>
                <ExternalLink className="ml-auto w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
