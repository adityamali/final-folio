"use client";
import { useState } from "react";
import { Send, Copy, Check, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hello@adityamali.com";
  const phone = "+91 7709953054"; // Add your phone number

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/adityamali",
      color: "hover:text-[#333]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/adityamali2003",
      color: "hover:text-[#0077b5] ",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/theadityamali",
      color: "hover:text-[#1DA1F2]",
    },
  ];

  return (
    <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto py-16">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-4xl font-bold">Get in Touch</h2>
        <p className="text-foreground-600 dark:text-foreground-400 text-lg max-w-2xl mx-auto">
          Whether you have a project in mind, want to collaborate, or just want
          to say hi, I'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        {/* Left Column - Contact Methods */}
        <div className="flex flex-col gap-8 p-6 bg-background dark:bg-background dark:bg-foreground/10 rounded-2xl border border-border">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Let's Talk</h3>
            <div className="flex flex-col gap-8">
              {/* Email Section */}
              <div className="space-y-4">
                <p className="text-foreground-600 dark:text-foreground-400">
                  Send me an email at:
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary text-white rounded-full transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 px-6 py-3 border border-border hover:border-primary/50 rounded-full transition-all duration-300 hover:bg-primary-light"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 " />
                    )}
                    <span>{copied ? "Copied!" : "Copy Email"}</span>
                  </button>
                </div>
              </div>

              {/* Phone Section */}
              <div className="space-y-4">
                <p className="text-foreground-600 dark:text-foreground-400">
                  Call or message me at:
                </p>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-primary/50 rounded-full transition-all duration-300 hover:bg-primary-light"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Social & Additional Info */}
        <div className="flex flex-col gap-8 p-6 bg-background dark:bg-background dark:bg-foreground/10 rounded-2xl border border-border">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Connect With Me</h3>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-foreground-600 dark:text-foreground-400">
                  Find me on social media:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 border border-border 
                        hover:border-primary/50 hover:bg-primary-light rounded-full transition-all duration-300 ${link.color}`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <h4 className="font-medium">Available for:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-foreground-600 dark:text-foreground-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Freelance Projects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Full-time Opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Technical Consulting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Collaborations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
