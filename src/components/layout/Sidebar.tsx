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
        { name: 'Home', href: '/', icon: Home, color: 'text-blue-400' },
        { name: 'Blog', href: '/blog', icon: BookOpen, color: 'text-orange-400' },
        { name: 'Projects', href: '/projects', icon: Code, color: 'text-green-400' },
        { name: 'About', href: '/about', icon: User, color: 'text-pink-400' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-sidebar text-sidebar-foreground md:hidden shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                    "fixed top-0 left-0 z-40 h-screen w-sidebar bg-sidebar border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Logo / Brand */}
                    <div className="mb-10 px-2">
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            AM<span className="text-primary">.</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium group",
                                        isActive
                                            ? "bg-white/10 text-foreground"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <item.icon size={20} className={cn("transition-colors", item.color)} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search Trigger */}
                    <div className="mt-auto pt-6 border-t border-border">
                        <button
                            onClick={triggerSearch}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors text-sm font-medium text-left"
                        >
                            <Search size={20} />
                            Search...
                            <span className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">
                                ⌘K
                            </span>
                        </button>
                    </div>

                    {/* Footer / Copyright */}
                    <div className="mt-6 px-4 text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} Aditya Mali
                    </div>
                </div>
            </aside>
        </>
    );
}
