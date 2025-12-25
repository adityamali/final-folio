"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  Mail,
  ExternalLink,
  Home,
  Briefcase,
  PenTool,
  FileText,
  Phone,
  X,
  Wand2,
  Command as CommandIcon,
} from "lucide-react";
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

    const openCommandBar = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-bar", openCommandBar);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-bar", openCommandBar);
    };
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
        action: () => (window.location.href = "/cafe"),
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
        icon: <ExternalLink className="w-4 h-4" />,
        action: () => window.open("https://linkedin.com/in/adityamali2003"),
      },
      {
        name: "Connect on Instagram",
        icon: <ExternalLink className="w-4 h-4" />,
        action: () => window.open("https://instagram.com/theadityamali"),
      },
      {
        name: "Connect on GitHub",
        icon: <ExternalLink className="w-4 h-4" />,
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
        action: () =>
          window.open(
            "https://bfpgqqmmjfivykmkselu.supabase.co/storage/v1/object/public/Resume//Resume.pdf"
          ),
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
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm animate-overlay-show transition-all duration-200 z-50" />
          <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl p-0 bg-cream rounded-none border-4 border-charcoal shadow-retro animate-content-show transition-all duration-200 z-50">
            <Dialog.Title className="sr-only">Command Menu</Dialog.Title>

            <Command className="w-full" loop>
              <div className="flex items-center gap-4 px-4 py-4 border-b-4 border-charcoal group">
                <Search className="w-5 h-5 text-charcoal/60 group-focus-within:text-orange transition-colors duration-200" strokeWidth={2.5} />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent outline-none placeholder:text-charcoal/60 text-charcoal font-medium transition-all duration-200 focus:placeholder:text-orange/60"
                />
                <Dialog.Close className="p-1.5 hover:bg-orange hover:text-cream border-2 border-transparent hover:border-charcoal transition-all duration-200 hover:scale-105 active:scale-95">
                  <X className="w-4 h-4" strokeWidth={2.5} />
                </Dialog.Close>
              </div>

              <Command.List className="mt-0 px-4 py-4 max-h-[400px] overflow-y-auto scroll-smooth overscroll-contain">
                <div className="space-y-6">
                  <Command.Group>
                    <div className="font-display text-xs uppercase tracking-wider text-charcoal/60 mb-2 px-2">Navigation</div>
                    {commands.navigation.map((cmd) => (
                      <Command.Item
                        key={cmd.name}
                        onSelect={cmd.action}
                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-200 border-2 border-transparent mb-1
                          hover:bg-teal hover:text-cream hover:border-charcoal
                          data-[selected=true]:bg-orange data-[selected=true]:text-cream data-[selected=true]:border-charcoal
                          data-[selected=true]:shadow-[2px_2px_0px_0px_#2D2D2D]
                          active:scale-95 focus:outline-none font-medium"
                        data-cursor="block"
                      >
                        <span className="transition-transform duration-200">
                          {cmd.icon}
                        </span>
                        <span className="transition-colors duration-200">
                          {cmd.name}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group>
                    <div className="font-display text-xs uppercase tracking-wider text-charcoal/60 mb-2 px-2">Connect</div>
                    {commands.connect.map((cmd) => (
                      <Command.Item
                        key={cmd.name}
                        onSelect={cmd.action}
                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-200 border-2 border-transparent mb-1
                          hover:bg-teal hover:text-cream hover:border-charcoal
                          data-[selected=true]:bg-orange data-[selected=true]:text-cream data-[selected=true]:border-charcoal
                          data-[selected=true]:shadow-[2px_2px_0px_0px_#2D2D2D]
                          active:scale-95 focus:outline-none font-medium"
                      >
                        <span className="transition-transform duration-200">
                          {cmd.icon}
                        </span>
                        <span className="transition-colors duration-200">
                          {cmd.name}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group>
                    <div className="font-display text-xs uppercase tracking-wider text-charcoal/60 mb-2 px-2">Resources</div>
                    {commands.resources.map((cmd) => (
                      <Command.Item
                        key={cmd.name}
                        onSelect={cmd.action}
                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-200 border-2 border-transparent mb-1
                          hover:bg-teal hover:text-cream hover:border-charcoal
                          data-[selected=true]:bg-orange data-[selected=true]:text-cream data-[selected=true]:border-charcoal
                          data-[selected=true]:shadow-[2px_2px_0px_0px_#2D2D2D]
                          active:scale-95 focus:outline-none font-medium"
                      >
                        <span className="transition-transform duration-200">
                          {cmd.icon}
                        </span>
                        <span className="transition-colors duration-200">
                          {cmd.name}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group>
                    <div className="font-display text-xs uppercase tracking-wider text-charcoal/60 mb-2 px-2">Fun</div>
                    {commands.fun.map((cmd) => (
                      <Command.Item
                        key={cmd.name}
                        onSelect={cmd.action}
                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-200 border-2 border-transparent mb-1
                          hover:bg-teal hover:text-cream hover:border-charcoal
                          data-[selected=true]:bg-orange data-[selected=true]:text-cream data-[selected=true]:border-charcoal
                          data-[selected=true]:shadow-[2px_2px_0px_0px_#2D2D2D]
                          active:scale-95 focus:outline-none font-medium"
                      >
                        <span className="transition-transform duration-200">
                          {cmd.icon}
                        </span>
                        <span className="transition-colors duration-200">
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

      {/* Mobile Command Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-orange text-cream border-2 border-charcoal shadow-retro md:hidden hover:scale-110 active:scale-95 transition-all duration-200 z-40"
        data-cursor="block"
        aria-label="Open Command Menu"
      >
        <CommandIcon className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </>
  );
}
