"use client";

import AppInput from "@/components/app-input";
import {movatif} from "@/app/fonts";
import * as React from "react";
import WorkspaceTabs from "@/components/workspacetabs";
import {useState} from "react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("workspace");
    return (
        <div className="flex flex-col items-center justify-center text-white px-4 h-full w-full">
            {/* Title */}
            <h1 className={`text-4xl md:text-5xl mb-3 text-white ${movatif.className}`}>
                Welcome
            </h1>
            {/* Tabs */}
            <WorkspaceTabs onChange={setActiveTab} />
            <AppInput />
        </div>
    );
}
