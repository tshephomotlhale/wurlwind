"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Undo2, RefreshCw, RotateCcw, Volume2, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Deck } from "./decks"

export type StudyState = {
    deckId: string
    cardIndex: number
    flipped: boolean
    known: number[]
    unknown: number[]
}

type Props = {
    deck: Deck
    state: StudyState
    setState: React.Dispatch<React.SetStateAction<StudyState | null>>
    onExit: () => void
    onFinish: (deckId: string, known: number, total: number) => void
}

export function StudyMode({ deck, state, setState, onExit, onFinish }: Props) {
    const [rotateY, setRotateY] = useState(0)
    const [displayFlipped, setDisplayFlipped] = useState(false)
    const card = deck.cards[state.cardIndex]
    const total = deck.cards.length
    const done = state.known.length + state.unknown.length
    const finished = done === total

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (finished) return
            if (e.key === "ArrowLeft") mark(false)
            if (e.key === "ArrowRight") mark(true)
            if (e.key === " ") { e.preventDefault(); flip() }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    })

    function flip() {
        if (rotateY % 90 !== 0) return
        setRotateY((r) => r + 90)
        setTimeout(() => {
            setDisplayFlipped((f) => !f)
            setState((s) => s && { ...s, flipped: !s.flipped })
            setRotateY((r) => r - 90)
        }, 200)
    }

    function mark(knew: boolean) {
        setDisplayFlipped(false)
        setRotateY(0)
        setState((s) => {
            if (!s) return s
            const newKnown = knew ? [...s.known, s.cardIndex] : s.known
            const newUnknown = !knew ? [...s.unknown, s.cardIndex] : s.unknown
            const newDone = newKnown.length + newUnknown.length
            if (newDone === total) onFinish(deck.id, newKnown.length, total)
            return {
                ...s,
                flipped: false,
                cardIndex: Math.min(s.cardIndex + 1, total - 1),
                known: newKnown,
                unknown: newUnknown,
            }
        })
    }

    function restart() {
        setDisplayFlipped(false)
        setRotateY(0)
        setState({ deckId: state.deckId, cardIndex: 0, flipped: false, known: [], unknown: [] })
    }

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                <RefreshCw className="h-12 w-12 text-[#34E8B0]" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-white">Deck complete!</h3>
                    <p className="text-sm text-muted-foreground">
                        <span className="text-[#34E8B0] font-medium">{state.known.length}</span> known ·{" "}
                        <span className="text-red-400 font-medium">{state.unknown.length}</span> still learning
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={onExit} className="cursor-pointer">
                        Back to decks
                    </Button>
                    <Button
                        className="bg-[#34E8B0] hover:bg-[#2fd9a5] text-black font-semibold cursor-pointer"
                        onClick={restart}
                    >
                        <RotateCcw className="h-4 w-4" /> Study again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <TooltipProvider>
            <div className="flex flex-col flex-1 min-h-0 w-full h-full">

                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 mb-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-muted-foreground hover:text-white cursor-pointer px-2"
                        onClick={onExit}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {deck.title}
                    </Button>

                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <Badge variant="outline" className="gap-1.5 border-orange-400/50 text-orange-400 font-semibold">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-orange-400 text-[10px]">
                                {state.unknown.length}
                            </span>
                            Still learning
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 border-[#34E8B0]/50 text-[#34E8B0] font-semibold">
                            Know
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#34E8B0] text-[10px]">
                                {state.known.length}
                            </span>
                        </Badge>
                    </div>
                </div>

                {/* Segmented progress */}
                <div className="flex gap-1 mb-4">
                    {deck.cards.map((_, i) => {
                        const isKnown = state.known.includes(i)
                        const isUnknown = state.unknown.includes(i)
                        const isCurrent = i === state.cardIndex
                        return (
                            <div
                                key={i}
                                className="flex-1 h-1.5 rounded-full transition-colors duration-300"
                                style={{
                                    backgroundColor: isKnown
                                        ? "#34E8B0"
                                        : isUnknown
                                        ? "#f87171"
                                        : isCurrent
                                        ? "rgba(255,255,255,0.3)"
                                        : "rgba(255,255,255,0.08)",
                                }}
                            />
                        )
                    })}
                </div>

                {/* Flip card */}
                <div
                    className="flex-1 cursor-pointer select-none min-h-0"
                    style={{ perspective: "1200px" }}
                    onClick={flip}
                >
                    <Card
                        className={`w-full h-full flex flex-col items-center justify-center text-center relative border transition-colors duration-200 ${
                            displayFlipped
                                ? "bg-[#34E8B0]/5 border-[#34E8B0]/30"
                                : "bg-card border-border"
                        }`}
                        style={{
                            transform: `rotateY(${rotateY}deg)`,
                            transition: "transform 0.2s ease",
                        }}
                    >
                        <CardContent className="flex flex-col items-center justify-center gap-6 p-10 w-full h-full">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-3 right-3 text-muted-foreground hover:text-white"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Text to speech"
                                    >
                                        <Volume2 className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Text to speech</TooltipContent>
                            </Tooltip>

                            <p className="text-foreground text-xl md:text-2xl leading-relaxed font-medium">
                                {displayFlipped ? card.back : card.front}
                            </p>

                            <Badge variant="outline" className="absolute bottom-3 text-muted-foreground border-border text-xs font-normal">
                                {state.cardIndex + 1} / {total}
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom actions */}
                <div className="flex items-center justify-between pt-4 pb-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full w-10 h-10 cursor-pointer"
                                disabled={state.cardIndex === 0}
                                onClick={() => setState((s) => s && { ...s, cardIndex: Math.max(0, s.cardIndex - 1), flipped: false })}
                            >
                                <Undo2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Go back</TooltipContent>
                    </Tooltip>

                    <div className="flex gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-14 h-14 rounded-full border-border hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                                    onClick={() => mark(false)}
                                    aria-label="Still learning"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Still learning</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-14 h-14 rounded-full border-border hover:border-[#34E8B0]/40 hover:bg-[#34E8B0]/10 hover:text-[#34E8B0] cursor-pointer"
                                    onClick={() => mark(true)}
                                    aria-label="Got it"
                                >
                                    <Check className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Got it</TooltipContent>
                        </Tooltip>
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full w-10 h-10 cursor-pointer"
                                onClick={restart}
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Restart deck</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}
