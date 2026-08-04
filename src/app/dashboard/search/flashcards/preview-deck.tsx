"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Deck } from "./decks"
import { getGrade } from "@/components/preview-quiz"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    deck: Deck | null
    onStart: (deckId: string) => void
}

export function PreviewDeck({ open, onOpenChange, deck, onStart }: Props) {
    if (!deck) return null

    const grade = deck.lastScore !== undefined ? getGrade(deck.lastScore) : null

    function handleStart() {
        onOpenChange(false)
        onStart(deck!.id)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="secondary" className="text-white/50 border-white/10 font-normal">
                            {deck.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-white/50 border-white/10 font-normal">
                            {deck.cards.length} Cards
                        </Badge>
                    </div>
                    <DialogTitle className="text-white text-xl">{deck.title}</DialogTitle>
                    <DialogDescription className="text-neutral-400 text-sm leading-relaxed">
                        Study this deck by flipping through cards and marking each one as known or still learning.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2 py-2 text-sm text-neutral-400">
                    <div className="flex justify-between">
                        <span>Topic</span>
                        <span className="text-white">{deck.topic}</span>
                    </div>
                    {deck.lastScore !== undefined && grade && (
                        <div className="flex justify-between items-center">
                            <span>Last attempt</span>
                            <div className="flex items-center gap-2">
                                <span className="text-white">{deck.lastScore}%</span>
                                <Badge className={`text-xs font-medium border ${grade.className}`}>
                                    {grade.label}
                                </Badge>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 pt-2">
                    <Button
                        variant="ghost"
                        className="text-neutral-400 hover:text-white cursor-pointer"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                        onClick={handleStart}
                    >
                        {deck.lastScore !== undefined ? "Retry Deck" : "Start Deck"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
