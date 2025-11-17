"use client";

import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import * as React from "react";
import {useIsMobile} from "@/hooks/use-mobile";

export default function Header() {

    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <header className="fixed top-0 right-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md
        transition-all"
                style={{
                    left: isMobile
                        ? "0"
                        : state === "expanded"
                            ? "var(--sidebar-width)"
                            : "var(--sidebar-width-icon)",
                }}
        >
            {/* Left Section: Sidebar Trigger + Breadcrumbs */}
            <div className="flex items-center gap-3">
                {/* Sidebar Trigger */}
                <SidebarTrigger />

                {/* Breadcrumbs */}
                {/* Breadcrumbs */}
                <Breadcrumb>
                    <BreadcrumbList className="text-xs md:text-sm">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Untitled Project</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

            </div>

            {/* Right Section: Buttons + Menu */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                >
                    <Image
                        src="/Icons/Forward.svg"
                        width={18}
                        height={18}
                        alt="Wurlwind logo"
                    />
                    Share
                </Button>
                <Button>Save</Button>

                {/* More menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 p-2 border-neutral-800 gap-1">
                        <DropdownMenuItem>
                            <Image
                            src="/Icons/Pen.svg"
                            width={18}
                            height={18}
                            alt="Rename Icon"/>
                            Rename</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Image
                            src="/Icons/Forward.svg"
                            width={18}
                            height={18}
                            alt="Share Icon"
                        />
                            Share</DropdownMenuItem>
                        <DropdownMenuItem
                            className="bg-red-600/10 text-red-500 hover:bg-red-600/20">
                            <Image
                            src="/Icons/Trash Bin Minimalistic.svg"
                            width={18}
                            height={18}
                            alt="Delete Icon"
                        />
                            Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
