import { Deck } from "./decks"
import { FlashcardCard } from "./flashcard-card"
import { Empty } from "@/components/ui/empty"

type Props = {
    decks: Deck[]
    isFiltered?: boolean
    onStudy: (deckId: string) => void
}

export function FlashcardGrid({ decks, isFiltered, onStudy }: Props) {
    if (decks.length === 0) {
        return (
            <Empty
                title={isFiltered ? "No decks match your search" : "No flashcard decks available"}
                description={
                    isFiltered
                        ? "Try a different keyword or clear the filter to see all decks."
                        : "Check back later — new decks will appear here."
                }
            />
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {decks.map((deck) => (
                <FlashcardCard key={deck.id} deck={deck} onStudy={onStudy} />
            ))}
        </div>
    )
}
