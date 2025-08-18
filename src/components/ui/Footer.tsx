export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 border-t border-border bg-gray-200 dark:bg-[#1e1e1e] fade-in">
      <div className="container mx-auto p-4">
        <p className="text-center text-sm text-foreground/60">
          Built using Next.js © {currentYear} Aditya Mali. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
