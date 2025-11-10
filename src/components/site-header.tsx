"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";

export function SiteHeader() {
    return (
        <header className="flex h-14 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="text-neutral-400 hover:text-white transition" />
                <Separator orientation="vertical" className="mx-2 h-4 bg-neutral-700" />
                <h1 className="text-base font-medium text-white">Dashboard</h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-300 hover:text-white"
                >
                    <Search className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-300 hover:text-white"
                >
                    <Bell className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex text-[#34E8B0] border-[#34E8B0] hover:bg-[#34E8B0]/10"
                    asChild
                >
                    <a
                        href="https://github.com/shadcn-ui/ui"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </Button>
            </div>
        </header>
    );
}
