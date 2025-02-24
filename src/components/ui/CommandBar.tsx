"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Home,
  Briefcase,
  PenTool,
  FileText,
  Phone,
  X,
} from "lucide-react";
import { Wand2 } from "lucide-react";
import { triggerConfetti } from "@/lib/animations";

export default function CommandBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = {
    navigation: [
      {
        name: "Go Home",
        icon: <Home className="w-4 h-4" />,
        action: () => (window.location.href = "/"),
      },
      {
        name: "See All Blogs",
        icon: <PenTool className="w-4 h-4" />,
        action: () => (window.location.href = "/blogs"),
      },
      {
        name: "See All Projects",
        icon: <Briefcase className="w-4 h-4" />,
        action: () => (window.location.href = "/projects"),
      },
    ],
    connect: [
      {
        name: "Connect on Mail",
        icon: <Mail className="w-4 h-4" />,
        action: () =>
          window.open(
            "mailto:hello@adityamali.com.com?subject=Let's%20Connect!"
          ),
      },
      {
        name: "Connect on LinkedIn",
        icon: <Linkedin className="w-4 h-4" />,
        action: () => window.open("https://linkedin.com/in/adityamali2003"),
      },
      {
        name: "Connect on Instagram",
        icon: <Instagram className="w-4 h-4" />,
        action: () => window.open("https://instagram.com/theadityamali"),
      },
      {
        name: "Connect on GitHub",
        icon: <Github className="w-4 h-4" />,
        action: () => window.open("https://github.com/adityamali"),
      },
      {
        name: "Connect on WhatsApp",
        icon: <Phone className="w-4 h-4" />,
        action: () => window.open("https://wa.me/7709953054"),
      },
    ],
    resources: [
      {
        name: "Resume",
        icon: <FileText className="w-4 h-4" />,
        action: () => window.open("/path-to-your-resume.pdf"),
      },
    ],
    fun: [
      {
        name: "Trigger Confetti",
        icon: <Wand2 className="w-4 h-4" />,
        action: () => {
          setOpen(false);
          triggerConfetti();
        },
      },
    ],
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-overlay-show transition-all duration-200" />
        <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl p-2 bg-background dark:bg-foreground/10 rounded-xl border border-border shadow-2xl animate-content-show transition-all duration-200 hover:border-primary/20">
          <Dialog.Title className="sr-only">Command Menu</Dialog.Title>

          <Command className="w-full" loop>
            <div className="flex items-center gap-4 px-3 border-b border-border pb-4 group">
              <Search className="w-5 h-5 text-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
              <Command.Input
                placeholder="Type a command or search..."
                className="w-full bg-transparent outline-none placeholder:text-foreground/60 transition-all duration-200 focus:placeholder:text-primary/60"
              />
              <Dialog.Close className="p-1.5 hover:bg-primary-light rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            <Command.List className="mt-4 px-2 pb-2 max-h-[300px] overflow-y-auto scroll-smooth overscroll-contain">
              <div className="px-1 pb-4">
                <Command.Group heading="Navigation">
                  {commands.navigation.map((cmd) => (
                    <Command.Item
                      key={cmd.name}
                      onSelect={cmd.action}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                        hover:bg-primary-light/50 dark:hover:bg-primary/10
                        data-[selected=true]:bg-primary-light dark:data-[selected=true]:bg-primary/20
                        data-[selected=true]:scale-[0.98]
                        active:scale-95 focus:outline-none"
                      data-cursor="block"
                    >
                      <span className="transition-transform duration-200 group-hover:rotate-12">
                        {cmd.icon}
                      </span>
                      <span className="transition-colors duration-200 group-hover:text-primary">
                        {cmd.name}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Connect" className="mt-6">
                  {commands.connect.map((cmd) => (
                    <Command.Item
                      key={cmd.name}
                      onSelect={cmd.action}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                        hover:bg-primary-light/50 dark:hover:bg-primary/10
                        data-[selected=true]:bg-primary-light dark:data-[selected=true]:bg-primary/20
                        data-[selected=true]:scale-[0.98]
                        active:scale-95 focus:outline-none"
                    >
                      <span className="transition-transform duration-200 group-hover:rotate-12">
                        {cmd.icon}
                      </span>
                      <span className="transition-colors duration-200 group-hover:text-primary">
                        {cmd.name}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Resources" className="mt-6">
                  {commands.resources.map((cmd) => (
                    <Command.Item
                      key={cmd.name}
                      onSelect={cmd.action}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                        hover:bg-primary-light/50 dark:hover:bg-primary/10
                        data-[selected=true]:bg-primary-light dark:data-[selected=true]:bg-primary/20
                        data-[selected=true]:scale-[0.98]
                        active:scale-95 focus:outline-none"
                    >
                      <span className="transition-transform duration-200 group-hover:rotate-12">
                        {cmd.icon}
                      </span>
                      <span className="transition-colors duration-200 group-hover:text-primary">
                        {cmd.name}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Fun" className="mt-6">
                  {commands.fun.map((cmd) => (
                    <Command.Item
                      key={cmd.name}
                      onSelect={cmd.action}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                        hover:bg-primary-light/50 dark:hover:bg-primary/10
                        data-[selected=true]:bg-primary-light dark:data-[selected=true]:bg-primary/20
                        data-[selected=true]:scale-[0.98]
                        active:scale-95 focus:outline-none"
                    >
                      <span className="transition-transform duration-200 group-hover:rotate-12">
                        {cmd.icon}
                      </span>
                      <span className="transition-colors duration-200 group-hover:text-primary">
                        {cmd.name}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </div>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
