"use client";

import AppInput from "@/components/app-input";
import { ReactNode } from "react";
import WorkspaceTabs from "@/components/workspacetabs";
import {useSidebar} from "@/components/ui/sidebar";
import {useIsMobile} from "@/hooks/use-mobile";
import { StudyModeProvider, useStudyMode } from "@/components/study-mode-context";

function SearchLayoutInner({ children }: { children: ReactNode }) {
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const { isStudying } = useStudyMode();

    return (
        <div className="relative flex flex-col h-full text-white bg-[#191a1a]">
            {/* Top Tabs with Bottom Fade */}
            <div className="sticky top-13 z-20 bg-[#191a1a] pt-2">
                <WorkspaceTabs />
                {/* Fade effect for content going under the tabs */}
                <div className="absolute top-full left-0 w-full h-8 bg-gradient-to-b from-[#191a1a] to-transparent pointer-events-none" />
            </div>

            {/* Middle Content Area — pb accounts for fixed input height so pagination isn't hidden */}
            <div className="flex-1 overflow-y-auto px-4 py-6 pb-36 space-y-4">
                <div className="max-w-4xl mx-auto w-full">
                    {children}
                </div>
            </div>

            {/* Bottom Fixed Input with Top Fade */}
            {!isStudying && (
                <div
                    className="fixed bottom-0 z-20"
                    style={{
                        left: isMobile ? "0" : state === "expanded" ? "var(--sidebar-width)" : "var(--sidebar-width-icon)",
                        right: "0",
                    }}
                >
                    <div className="absolute bottom-full left-0 w-full h-12 bg-gradient-to-t from-[#191a1a] to-transparent pointer-events-none" />
                    <div className="bg-[#191a1a] py-2">
                        <div className="max-w-2xl mx-auto px-4">
                            <AppInput />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function SearchLayout({ children }: { children: ReactNode }) {
    return (
        <StudyModeProvider>
            <SearchLayoutInner>{children}</SearchLayoutInner>
        </StudyModeProvider>
    )
}