'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Code, User, Search, Menu, X } from 'lucide-react';
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
        { name: 'Projects', href: '/projects', icon: Code },
        { name: 'About', href: '/about', icon: User },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-5 left-5 z-50 p-2.5 rounded-lg bg-sidebar border border-sidebar-border md:hidden shadow-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 md:z-0 h-screen w-sidebar bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-8">
                    {/* Logo / Brand */}
                    <div className="mb-12">
                        <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity inline-block">
                            <span className="text-foreground">Aditya</span>
                            <span className="text-muted-foreground ml-1">Mali</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium group relative",
                                        isActive
                                            ? "bg-muted text-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-foreground rounded-r-full" />
                                    )}
                                    <item.icon size={20} className="transition-transform group-hover:scale-110" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search Trigger */}
                    <div className="mt-auto pt-6 border-t border-sidebar-border">
                        <button
                            onClick={triggerSearch}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all text-sm font-medium text-left group"
                        >
                            <Search size={18} className="transition-transform group-hover:scale-110" />
                            <span>Search</span>
                            <span className="ml-auto text-xs font-mono bg-muted px-2 py-1 rounded border border-border text-muted-foreground">
                                ⌘K
                            </span>
                        </button>
                    </div>

                    {/* Footer / Copyright */}
                    <div className="mt-6 text-xs text-muted-foreground/60">
                        <p>© {new Date().getFullYear()} Aditya Mali</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
