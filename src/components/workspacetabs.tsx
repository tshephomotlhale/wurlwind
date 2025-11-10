"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const tabs = [
    { id: "workspace", label: "Workspace" },
    { id: "quiz", label: "Quiz" },
    { id: "flashcards", label: "Flashcards" },
    { id: "notes", label: "Notes" },
    { id: "plan", label: "Plan" },
];

export default function WorkspaceTabs({
                                          onChange,
                                      }: {
    onChange?: (activeTab: string) => void;
}) {
    const [activeTab, setActiveTab] = useState("workspace");

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onChange?.(tabId);
    };

    return (
        <div className="flex justify-center gap-2 mb-3">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    variant="ghost"
                    size="sm"
                    className={clsx(
                        "rounded-lg transition text-xs font-medium",
                        activeTab === tab.id
                            ? "bg-[#34E8B0]/10 text-[#34E8B0] hover:bg-[#34E8B0]/20 border-none"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    )}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}
