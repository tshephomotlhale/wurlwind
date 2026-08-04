"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers } from "lucide-react"
import { Deck } from "./decks"
import { getGrade } from "@/components/preview-quiz"
import { PreviewDeck } from "./preview-deck"

type Props = {
    deck: Deck
    onStudy: (deckId: string) => void
}

export function FlashcardCard({ deck, onStudy }: Props) {
    const [open, setOpen] = useState(false)
    const grade = deck.lastScore !== undefined ? getGrade(deck.lastScore) : null

    return (
        <>
            <Card className="border-none transition-all duration-300 hover:border-[#34E8B0]/30 hover:-translate-y-1">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            {deck.lastScore !== undefined && grade && (
                                <Badge className={`text-xs font-medium border px-2.5 py-0.5 ${grade.className}`}>
                                    {deck.lastScore}%
                                </Badge>
                            )}
                            <Badge variant="secondary" className="border-white/10 text-white/50 font-normal">
                                {deck.difficulty}
                            </Badge>
                        </div>
                    </div>
                    <h3 className="font-semibold text-lg leading-tight text-white line-clamp-1">
                        {deck.title}
                    </h3>
                    <Badge variant="outline" className="border-white/10 text-white/50 font-normal">
                        {deck.cards.length} cards
                    </Badge>
                </CardHeader>

                <CardContent className="text-xs line-clamp-2">
                    <p>{deck.cards[0].front}</p>
                </CardContent>

                <CardFooter className="pt-0 mt-auto">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="w-full bg-white/5 hover:bg-[#34E8B0] hover:text-black border-none transition-all duration-300 font-medium cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        Preview
                    </Button>
                </CardFooter>
            </Card>

            <PreviewDeck open={open} onOpenChange={setOpen} deck={deck} onStart={onStudy} />
        </>
    )
}
