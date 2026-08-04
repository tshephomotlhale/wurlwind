"use client"

import { useEffect, useMemo, useState } from "react"
import { DECKS, Deck } from "./decks"
import { FlashcardHeader } from "./flashcard-header"
import { FlashcardGrid } from "./flashcard-grid"
import { StudyMode, StudyState } from "./study-mode"
import { QuizPagination } from "@/app/dashboard/search/quiz/pagination-custom"
import { useStudyMode } from "@/components/study-mode-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const ITEMS_PER_PAGE = 9

export default function FlashcardsPage() {
    const [study, setStudy] = useState<StudyState | null>(null)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [scores, setScores] = useState<Record<string, number>>({})
    const { setIsStudying } = useStudyMode()

    useEffect(() => {
        setIsStudying(!!study)
        return () => setIsStudying(false)
    }, [study, setIsStudying])

    const decksWithScores: Deck[] = useMemo(
        () => DECKS.map((d) => ({ ...d, lastScore: scores[d.id] })),
        [scores]
    )

    const filteredDecks = useMemo(() => {
        return decksWithScores.filter((deck) => {
            const matchesSearch = deck.title.toLowerCase().includes(search.toLowerCase())
            const matchesFilter = filter === "all" ? true : deck.difficulty === filter
            return matchesSearch && matchesFilter
        })
    }, [decksWithScores, search, filter])

    const totalPages = Math.ceil(filteredDecks.length / ITEMS_PER_PAGE)

    const paginatedDecks = filteredDecks.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    function handleFinish(deckId: string, known: number, total: number) {
        setScores((prev) => ({ ...prev, [deckId]: Math.round((known / total) * 100) }))
    }

    const activeDeck = study ? DECKS.find((d) => d.id === study.deckId) : null

    return (
        <>
            <div className="space-y-5 mx-auto max-w-full w-full px-4">
                <FlashcardHeader
                    onSearchAction={(val) => { setSearch(val); setPage(1) }}
                    onFilterChangeAction={(val) => { setFilter(val); setPage(1) }}
                />

                <FlashcardGrid
                    decks={paginatedDecks}
                    isFiltered={search.trim() !== "" || filter !== "all"}
                    onStudy={(deckId) => setStudy({ deckId, cardIndex: 0, flipped: false, known: [], unknown: [] })}
                />

                {filteredDecks.length > 0 && (
                    <QuizPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChangeAction={setPage}
                    />
                )}
            </div>

            <Dialog open={!!study} onOpenChange={(open) => { if (!open) setStudy(null) }}>
                <DialogContent showCloseButton={false} className="max-w-5xl w-[95vw] h-[92vh] p-6 bg-[#191a1a] border-neutral-800 flex flex-col overflow-hidden">
                    {study && activeDeck && (
                        <StudyMode
                            deck={activeDeck}
                            state={study}
                            setState={setStudy}
                            onExit={() => setStudy(null)}
                            onFinish={handleFinish}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
