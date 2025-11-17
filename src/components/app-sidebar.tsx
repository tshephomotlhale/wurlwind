"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarGroupAction,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Plus,
} from "lucide-react";
import Image from "next/image";
import { movatif } from "@/app/fonts";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {AddProjectModal} from "@/components/add-project-modal";

const navMain = [
    { title: "Home", icon: "/Icons/Rounded Magnifer Zoom In.svg", url: "#" },
    { title: "Discover", icon: "/Icons/Atom.svg", url: "#" },
    { title: "Timetable", icon: "/Icons/Calendar.svg", url: "#" },
    { title: "Materials", icon: "/Icons/Server Minimalistic.svg", url: "#" },

];

const navProjects = [
    { title: "COMP201", icon: "/Icons/File Text.svg", url: "#" },
    { title: "MATH402", icon: "/Icons/File Text.svg", url: "#" },
    { title: "PHY301", icon: "/Icons/File Text.svg", url: "#" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open } = useSidebar();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <Sidebar
            collapsible="icon"
            className="bg-neutral-950 text-neutral-100 border-r border-neutral-800"
            {...props}
        >
            {/* Header */}
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="gap-2 text-white hover:bg-neutral-900/70 transition"
                        >
                            <a href="#">
                                <Image
                                    src="/Icons/Icon-Regular.svg"
                                    width={30}
                                    height={30}
                                    alt="Wurlwind logo"
                                />
                                {open && (
                                    <span
                                        className={`text-3xl font-normal text-white ${movatif.className}`}
                                    >
                    Wurlwind
                  </span>
                                )}
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent>
                {/* Dashboard */}
                <SidebarGroup>
                    {open && (
                        <SidebarGroupLabel className="text-sm text-neutral-500 my-2">
                            Dashboard
                        </SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className="hover:bg-neutral-900/60 transition text-neutral-300 hover:text-white"
                                    >
                                        <a href={item.url} className="flex items-center gap-3">
                                            <Image
                                                src={item.icon}
                                                width={20}
                                                height={20}
                                                alt={`${item.title} icon`}
                                            />
                                            {open && <span className="text-md">{item.title}</span>}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Projects */}
                <SidebarGroup className="mt-2">
                    <div className="flex items-center justify-between">
                        {open && (
                            <SidebarGroupLabel className="text-sm text-neutral-500">
                                Projects
                            </SidebarGroupLabel>
                        )}
                        <SidebarGroupAction title="Add Project" onClick={() => setIsModalOpen(true)}>
                            <Plus className="h-5 w-5 text-neutral-400 hover:text-white transition" />
                        </SidebarGroupAction>

                        <AddProjectModal open={isModalOpen} onOpenChange={setIsModalOpen} />
                    </div>

                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            {navProjects.map((project) => (
                                <SidebarMenuItem key={project.title}>
                                    <div className="group flex items-center justify-between w-full">
                                        <SidebarMenuButton
                                            asChild
                                            className="flex-1 hover:bg-neutral-900/60 text-neutral-300 hover:text-white transition rounded-md"
                                        >
                                            <a href={project.url} className="flex items-center gap-3">
                                                <Image
                                                    src={project.icon}
                                                    width={20}
                                                    height={20}
                                                    alt={`${project.title} icon`}
                                                />
                                                {open && <span className="text-md">{project.title}</span>}
                                            </a>
                                        </SidebarMenuButton>

                                        {open && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-neutral-800 transition">
                                                        <Image
                                                            src="/Icons/Menu Dots.svg"
                                                            width={16}
                                                            height={16}
                                                            alt="Wurlwind logo"
                                                        />
                                                    </button>
                                                </PopoverTrigger>

                                                <PopoverContent
                                                    align="end"
                                                    side="right"
                                                    className="w-40 p-2 border-neutral-800"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="justify-start gap-2 text-neutral-300 hover:text-white hover:bg-neutral-900/70"
                                                        >
                                                            <Image
                                                                src="/Icons/Pen.svg"
                                                                width={18}
                                                                height={18}
                                                                alt="Wurlwind logo"
                                                            />
                                                            Rename
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="justify-start gap-2 text-neutral-300 hover:text-white hover:bg-neutral-900/70"
                                                        >
                                                            <Image
                                                                src="/Icons/Forward.svg"
                                                                width={18}
                                                                height={18}
                                                                alt="Wurlwind logo"
                                                            />
                                                            Share
                                                        </Button>
                                                        <Separator className="my-2 bg-neutral-800" />
                                                        <Button
                                                            size="sm"
                                                            className="justify-start gap-2 bg-red-600/10 text-red-500 hover:bg-red-600/20"
                                                        >
                                                            <Image
                                                                src="/Icons/Trash Bin Minimalistic.svg"
                                                                width={18}
                                                                height={18}
                                                                alt="Wurlwind logo"
                                                            />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </div>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer with Profile Popover */}
            <SidebarFooter className={"py-4"}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Popover>
                            <PopoverTrigger asChild>
                                <SidebarMenuButton className={`p-0 hover:none ${open ? 'justify-start' : 'justify-center'}`}>
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="User avatar"
                                        />
                                        <AvatarFallback>MM</AvatarFallback>
                                    </Avatar>
                                    {open && (
                                        <div className="ml-1 text-left">
                                            <p className="text-sm font-medium">Mpho Motlhale</p>
                                            <p className="text-xs text-neutral-500">
                                                tshephomotlhale@outlook.com
                                            </p>
                                        </div>
                                    )}
                                </SidebarMenuButton>
                            </PopoverTrigger>

                            <PopoverContent
                                side="right"
                                align="end"
                                className="w-56 p-2 border-neutral-800"
                            >
                                <div className="py-2 flex flex-col gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start gap-2 text-neutral-300 hover:text-white hover:bg-neutral-900/70"
                                    >
                                        <Image
                                            src="/Icons/User Circle.svg"
                                            width={18}
                                            height={18}
                                            alt="Wurlwind logo"
                                        />
                                        Account
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start gap-2 text-neutral-300 hover:text-white hover:bg-neutral-900/70"
                                    >
                                        <Image
                                            src="/Icons/Settings.svg"
                                            width={18}
                                            height={18}
                                            alt="Wurlwind logo"
                                        />
                                        Settings
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start gap-2 text-neutral-300 hover:text-white hover:bg-neutral-900/70"
                                    >
                                        <Image
                                            src="/Icons/Question Circle.svg"
                                            width={18}
                                            height={18}
                                            alt="Wurlwind logo"
                                        />
                                        Support
                                    </Button>
                                    <Separator className="my-2 bg-neutral-800" />

                                    <Button
                                        size="sm"
                                        variant={"ghost"}
                                        className="justify-between"
                                    >
                                        Upgrade Plan
                                        <Image
                                            src="/Icons/Arrow Right Up.svg"
                                            width={18}
                                            height={18}
                                            alt="Wurlwind logo"
                                        />
                                    </Button>

                                    <Button
                                        size="sm"
                                        className="justify-start gap-2 bg-red-600/10 text-red-500 hover:bg-red-600/20 mt-0.5"
                                    >
                                        <Image
                                            src="/Icons/Logout.svg"
                                            width={18}
                                            height={18}
                                            alt="Wurlwind logo"
                                        />
                                        Log out
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
