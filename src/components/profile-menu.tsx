"use client";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Settings,
    User,
    HelpCircle,
    Globe,
    LogOut,
    ArrowUpRight,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export function ProfileMenu() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="p-5 rounded-md">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar"/>
                        <AvatarFallback>MM</AvatarFallback>
                    </Avatar>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-4">
                <div className="flex items-center gap-3 pb-3 border-b">
                    <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                        <AvatarFallback>MM</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Mpho Motlhale</p>
                        <p className="text-xs text-muted-foreground">mpho@email.com</p>
                    </div>
                </div>

                <div className="py-2 flex flex-col gap-1">
                    <Button variant="ghost" className="justify-start gap-2" size="sm">
                        <User className="h-4 w-4" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2" size="sm">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2" size="sm">
                        <HelpCircle className="h-4 w-4" />
                        Support
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2" size="sm">
                        <Globe className="h-4 w-4" />
                        Language
                    </Button>

                    <Separator className="my-2" />

                    <Button variant="outline" className="justify-between gap-2" size="sm">
                        Upgrade Plan
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="destructive"
                        className="justify-start gap-2"
                        size="sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
