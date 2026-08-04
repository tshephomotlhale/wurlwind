"use client";

import AppInput from "@/components/app-input";
import { movatif } from "@/app/fonts";
import WorkspaceTabs from "@/components/workspacetabs";

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center text-white px-4 h-full w-full gap-4">
            {/* Title */}
            <h1 className={`text-4xl md:text-5xl text-white ${movatif.className}`}>
                Welcome
            </h1>
            {/* Tabs */}
            <WorkspaceTabs />
            {/* Input */}
            <div className="w-full max-w-2xl">
                <AppInput />
            </div>
        </div>
    );
}
