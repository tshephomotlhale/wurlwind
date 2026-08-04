"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const suggestions = [
    "Summarise Chapter 4 for me",
    "Generate 10 practice questions",
    "Create a study plan for my exam",
    "Explain the key concepts",
];

export default function WorkspacePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-white py-12">
            {/* Logo / icon */}
            <div className="flex flex-col items-center gap-3">
                <Image
                    src="/Icons/Icon-Regular.svg"
                    width={40}
                    height={40}
                    alt="Wurlwind"
                    className="opacity-60"
                />
                <h2 className="text-xl font-semibold text-white">
                    What would you like to study today?
                </h2>
                <p className="text-sm text-neutral-500 text-center max-w-sm">
                    Upload materials, ask questions, or let Wurlwind generate
                    study content for this project.
                </p>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {suggestions.map((s) => (
                    <Button
                        key={s}
                        variant="ghost"
                        size="sm"
                        className="rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:border-[#34E8B0]/50 hover:bg-[#34E8B0]/5 transition text-xs"
                    >
                        {s}
                    </Button>
                ))}
            </div>
        </div>
    );
}
