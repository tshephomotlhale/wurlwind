"use client";


import AppInput from "@/components/app-input";
import { ReactNode } from "react";
import WorkspaceTabs from "@/components/workspacetabs";

export default function SearchLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col h-full  text-white">
            {/* Top Tabs */}
            <div className="sticky top-0 z-0 backdrop-blur-md pt-2">
                <WorkspaceTabs />
            </div>

            {/* Middle Content Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                <div className="max-w-2xl mx-auto w-full">
                    {children}
                </div>
            </div>

            {/* Bottom Fixed Input */}
            <div className="sticky bottom-0 z-0 backdrop-blur-md py-2">
                <div className="max-w-2xl mx-auto px-4">
                    <AppInput />
                </div>
            </div>
        </div>
    );
}
