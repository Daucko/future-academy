"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, School, CircleUser, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";

interface MobileNavProps {
    session: Session | null;
}

export function MobileNav({ session }: MobileNavProps) {
    const [open, setOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Academics", href: "#" },
        { name: "Admissions", href: "/admissions" },
        { name: "Campus Life", href: "#" },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] px-7 bg-white">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-left flex items-center gap-3">
                        <div className="size-10 bg-purple-50 rounded-xl text-primary flex items-center justify-center">
                            <School className="h-6 w-6" />
                        </div>
                        <span className="font-bold">Future Academy</span>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-text-muted hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    {session ? (
                        <Link
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-3"
                        >
                            <LayoutDashboard className="h-6 w-6" />
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/signin"
                            onClick={() => setOpen(false)}
                            className="text-lg font-semibold text-text-main hover:text-primary transition-colors flex items-center gap-3"
                        >
                            <CircleUser className="h-6 w-6" />
                            Portal Login
                        </Link>
                    )}
                    <Button
                        className="w-full bg-primary hover:bg-primary-hover text-white h-12 rounded-full text-base font-bold transition-all mt-4"
                        asChild
                    >
                        <Link href="/admissions" onClick={() => setOpen(false)}>
                            Apply Now
                        </Link>
                    </Button>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
