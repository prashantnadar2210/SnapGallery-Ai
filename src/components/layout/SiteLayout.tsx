import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Brand, Container } from "@/components/common/Shared";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { footerGroups, mainNav } from "@/data/navigation";
import { solutions } from "@/data/solutions";
import { site } from "@/data/site";
import type { ReactNode } from "react";
import { NavigationLoading } from "@/components/common/NavigationLoading";
export function SiteLayout({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    return (
        <>
            <NavigationLoading />
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-background focus:p-4"
            >
                Skip to content
            </a>
            <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
                <Container className="flex h-20 items-center justify-between gap-4">
                    <Brand />
                    <nav
                        aria-label="Main navigation"
                        className="hidden items-center gap-7 text-[13px] font-medium lg:flex"
                    >
                        {mainNav.slice(0, 2).map((n) => (
                            <Link key={n.to} to={n.to} activeProps={{ className: "text-primary" }}>
                                {n.label}
                            </Link>
                        ))}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="px-0 text-[13px]">
                                    Solutions
                                    <ChevronDown className="size-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {solutions.map((s) => (
                                    <DropdownMenuItem key={s.slug} asChild>
                                        <Link to="/solutions/$slug" params={{ slug: s.slug }}>
                                            {s.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link to="/pricing" activeProps={{ className: "text-primary" }}>
                            Pricing
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="px-0 text-[13px]">
                                    Resources
                                    <ChevronDown className="size-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link to="/demo-gallery">Demo gallery</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/about">About us</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/contact">Contact</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard">Demo workspace</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                    <div className="hidden items-center gap-6 lg:flex">
                        <Link to="/login" className="text-sm font-medium">
                            Log in
                        </Link>
                        <Button asChild>
                            <Link to="/signup">
                                Get started
                                <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                    <Button
                        className="lg:hidden"
                        variant="ghost"
                        size="icon"
                        aria-label={open ? "Close navigation" : "Open navigation"}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </Button>
                </Container>
                <AnimatePresence>
                    {open && (
                        <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-border lg:hidden"
                            aria-label="Mobile navigation"
                        >
                            <div className="grid gap-1 px-5 py-4">
                                {[
                                    ...mainNav,
                                    { label: "Solutions", to: "/solutions" },
                                    { label: "Demo gallery", to: "/demo-gallery" },
                                    { label: "About us", to: "/about" },
                                    { label: "Contact", to: "/contact" },
                                    { label: "Log in", to: "/login" },
                                ].map((n) => (
                                    <Link
                                        key={n.to}
                                        to={n.to}
                                        onClick={() => setOpen(false)}
                                        className="rounded-md px-3 py-3 text-sm hover:bg-secondary"
                                    >
                                        {n.label}
                                    </Link>
                                ))}
                                <Button asChild>
                                    <Link to="/signup" onClick={() => setOpen(false)}>
                                        Get started
                                        <ArrowUpRight />
                                    </Link>
                                </Button>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>
            <main id="main" key={pathname}>
                {children}
            </main>
            <footer className="border-t border-border py-14">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr]">
                        <div>
                            <Brand />
                            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                                Every event has a story.
                                <br />
                                Help everyone find their part in it.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
                            {footerGroups.map((g) => (
                                <div key={g.name}>
                                    <h3 className="mb-5 text-sm font-semibold">{g.name}</h3>
                                    <ul className="space-y-3">
                                        {g.links.map((l) => (
                                            <li key={l.label}>
                                                {"slug" in l ? (
                                                    <Link
                                                        to="/solutions/$slug"
                                                        params={{ slug: l.slug }}
                                                        className="text-xs text-muted-foreground hover:text-primary"
                                                    >
                                                        {l.label}
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to={l.to}
                                                        className="text-xs text-muted-foreground hover:text-primary"
                                                    >
                                                        {l.label}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
                        <p>
                            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
                        </p>
                        <p className="text-md">Made with <span className="text-red-500">&#10084;</span> by <a href="https://pncreationweb.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">PN Creation Web</a></p>
                        <p>Made for the moments that matter.</p>
                    </div>
                </Container>
            </footer>
        </>
    );
}
