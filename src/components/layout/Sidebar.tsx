'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, Menu, X, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Sidebar() {
    // Sidebar navigation component
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const triggerSearch = () => {
        window.dispatchEvent(new Event('open-command-bar'));
        setIsOpen(false);
    };

    // Close sidebar on route change on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Blog', href: '/blog', icon: BookOpen },
        { name: 'Software Café', href: '/cafe', icon: Coffee },
        { name: 'About', href: '/about', icon: User },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2.5 bg-orange text-cream border-2 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:hidden"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-charcoal/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container - Vintage Spine Style */}
            <aside
                className={cn(
                    "fixed md:relative top-0 left-0 z-40 h-full w-[260px] md:w-[280px] bg-charcoal text-cream border-r-4 border-charcoal transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header / Brand */}
                <div className="p-6 md:p-8 border-b-4 border-cream/20">
                    <Link href="/" className="block" onClick={() => setIsOpen(false)}>
                        <h1 className="font-display text-4xl md:text-5xl uppercase leading-none tracking-tighter text-orange drop-shadow-md">
                            Aditya<br/>Mali
                        </h1>
                        <p className="font-accent text-teal text-base md:text-lg mt-2 -rotate-2">
                            Developer & Designer
                        </p>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 md:py-8 px-4 md:px-6 space-y-3 md:space-y-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 text-base md:text-xl font-display uppercase tracking-wide transition-all border-2",
                                    isActive
                                        ? "bg-cream text-charcoal border-cream shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro translate-x-1 md:translate-x-2"
                                        : "border-transparent text-cream/80 hover:text-orange hover:border-orange hover:bg-charcoal"
                                )}
                            >
                                <item.icon size={20} strokeWidth={2.5} className="md:w-6 md:h-6" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Search & Footer */}
                <div className="p-4 md:p-6 border-t-4 border-cream/20 bg-charcoal">
                    <button
                        onClick={triggerSearch}
                        className="w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-teal text-cream font-bold uppercase tracking-wider text-sm md:text-base border-2 border-cream hover:bg-orange transition-colors shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro mb-4 md:mb-6"
                    >
                        <span>Search</span>
                        <span className="font-mono text-xs md:text-sm bg-black/20 px-2 py-1 rounded">⌘K</span>
                    </button>
                    
                    <div className="text-center font-mono text-[10px] md:text-xs text-cream/40 uppercase tracking-widest">
                        Est. {new Date().getFullYear()}
                    </div>
                </div>
            </aside>
        </>
    );
}
