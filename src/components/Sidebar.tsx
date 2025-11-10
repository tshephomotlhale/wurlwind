"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    ChevronDown,
    Home,
    Book,
    User,
    PlusIcon,
    FrameIcon,
    PieChartIcon,
    MapIcon,
    LogOut,
    Settings,
} from "lucide-react";

export function AppSidebar() {
    return (
        <Sidebar className="bg-neutral-900 text-neutral-100 border-r border-neutral-800">
            {/* Header */}
            <SidebarHeader className="border-b border-neutral-800 py-4">
                <div className="flex items-center justify-between px-4">
                    <h1 className="text-lg font-semibold tracking-tight">
                        <span className="text-[#34E8B0]">AI</span> Study
                    </h1>
                    <SidebarTrigger className="text-neutral-400 hover:text-white transition" />
                </div>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent>
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-xs uppercase tracking-wider text-neutral-500 px-4">
                        Main
                    </SidebarGroupLabel>
                    <SidebarMenu className="space-y-1 mt-2">
                        <SidebarMenuItem>
                            <SidebarMenuButton className="hover:bg-neutral-800/70 transition-colors">
                                <Home className="mr-2 h-4 w-4" /> Dashboard
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="hover:bg-neutral-800/70 transition-colors">
                                <Book className="mr-2 h-4 w-4" /> Courses
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="hover:bg-neutral-800/70 transition-colors">
                                <User className="mr-2 h-4 w-4" /> Profile
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="hover:bg-neutral-800/70 transition-colors">
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* Projects Section */}
                <SidebarGroup className="mt-6">
                    <div className="flex items-center justify-between px-4">
                        <SidebarGroupLabel className="text-xs uppercase tracking-wider text-neutral-500">
                            Projects
                        </SidebarGroupLabel>
                        <SidebarGroupAction title="Add Project" className="text-neutral-400 hover:text-white">
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Add Project</span>
                        </SidebarGroupAction>
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu className="mt-2 space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className="hover:bg-neutral-800/70 transition-colors"
                                >
                                    <a href="#">
                                        <FrameIcon className="h-4 w-4" />
                                        <span className="ml-2">Design Engineering</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className="hover:bg-neutral-800/70 transition-colors"
                                >
                                    <a href="#">
                                        <PieChartIcon className="h-4 w-4" />
                                        <span className="ml-2">Sales & Marketing</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className="hover:bg-neutral-800/70 transition-colors"
                                >
                                    <a href="#">
                                        <MapIcon className="h-4 w-4" />
                                        <span className="ml-2">Travel</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-neutral-800 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="hover:bg-neutral-800/70 transition-colors">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
