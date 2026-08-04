"use client"

import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    onSearchAction: (value: string) => void
    onFilterChangeAction: (value: string) => void
}

export function FlashcardHeader({ onSearchAction, onFilterChangeAction }: Props) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold shrink-0">Flashcard Decks</h2>

            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-56">
                    <Image
                        src="/Icons/Rounded Magnifer Zoom In.svg"
                        width={16}
                        height={16}
                        alt="Search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search decks..."
                        onChange={(e) => onSearchAction(e.target.value)}
                        className="w-full bg-neutral-800 border-none rounded-md h-9 pl-8 pr-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition"
                    />
                </div>

                <Select onValueChange={onFilterChangeAction} defaultValue="all">
                    <SelectTrigger className="w-[140px] bg-neutral-800 border-none text-neutral-300 focus:ring-1 focus:ring-neutral-600">
                        <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
