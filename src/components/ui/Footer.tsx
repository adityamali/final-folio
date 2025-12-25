export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Aditya Mali. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-foreground font-medium">Next.js</span> & <span className="text-foreground font-medium">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
