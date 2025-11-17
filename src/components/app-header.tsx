"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import * as React from "react";

export default function Header() {
    return (
        <header className="fixed top-0 right-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md
        transition-all"
                style={{ left: "var(--sidebar-width)" }}>
            {/* Left Section: Sidebar Trigger + Breadcrumbs */}
            <div className="flex items-center gap-3">
                {/* Sidebar Trigger */}
                <SidebarTrigger />

                {/* Breadcrumbs */}
                <Breadcrumb>
                    <BreadcrumbList>
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
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
