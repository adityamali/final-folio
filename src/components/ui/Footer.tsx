"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-4 border-charcoal bg-cream text-charcoal">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-display uppercase text-xl tracking-wider">
              © {currentYear} Aditya Mali
            </p>
            <p className="font-mono text-xs uppercase tracking-widest opacity-60 mt-1">
              All Rights Reserved • Crafted with Code
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <p className="font-accent text-lg text-teal -rotate-2">
                Designed & Developed
             </p>
          </div>

          <div className="text-sm font-bold uppercase tracking-wider">
            Built with <span className="text-orange">Next.js</span> & <span className="text-orange">TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
