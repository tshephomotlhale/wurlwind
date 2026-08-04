"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const tabs = [
    { id: "workspace",  label: "Workspace",     path: "/dashboard/search" },
    { id: "quiz",       label: "Practice Tests", path: "/dashboard/search/quiz" },
    { id: "flashcards", label: "Flashcards",     path: "/dashboard/search/flashcards" },
    { id: "notes",      label: "Notes",          path: "/dashboard/search/notes" },
    { id: "plan",       label: "Plan",           path: "/dashboard/search/plan" },
];

export default function WorkspaceTabs() {
    const router   = useRouter();
    const pathname = usePathname();

    // Match most specific path first (quiz before search, etc.)
    const activeTab = [...tabs]
        .reverse()
        .find((t) => pathname.startsWith(t.path))?.id ?? "workspace";

    return (
        <div className="flex justify-center gap-2 mb-3 px-10">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    onClick={() => router.push(tab.path)}
                    variant="ghost"
                    size="sm"
                    className={clsx(
                        "rounded-lg transition text-xs md:text-sm font-medium cursor-pointer",
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
