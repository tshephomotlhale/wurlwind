import { cn } from "@/lib/utils"
import { MatchingQuestion } from "@/components/quiz/types"

type Props = {
    question: MatchingQuestion
    matchAnswers: Record<string, string>
    onChange: (left: string, right: string) => void
    submitted: boolean
}

export function Matching({ question, matchAnswers, onChange, submitted }: Props) {
    const rights = question.pairs.map(p => p.right)

    return (
        <div className="flex flex-col gap-3">
            <p className="text-xs text-neutral-500">Match each item on the left to the correct option on the right</p>
            {question.pairs.map((pair) => {
                const selected  = matchAnswers[pair.left]
                const isCorrect = submitted && selected === pair.right
                const isWrong   = submitted && !!selected && selected !== pair.right

                return (
                    <div key={pair.left} className="flex items-center gap-3">
                        <div className={cn(
                            "flex-1 px-4 py-3 rounded-xl border text-sm text-white",
                            isCorrect ? "border-[#34E8B0] bg-[#34E8B0]/10 text-[#34E8B0]"
                            : isWrong  ? "border-red-500 bg-red-500/10 text-red-400"
                            : "border-neutral-700 bg-neutral-800/50"
                        )}>
                            {pair.left}
                        </div>

                        <span className="text-neutral-600 shrink-0">→</span>

                        <select
                            disabled={submitted}
                            value={selected ?? ""}
                            onChange={(e) => onChange(pair.left, e.target.value)}
                            className={cn(
                                "flex-1 px-3 py-3 rounded-xl border text-sm bg-neutral-800 focus:outline-none transition-colors",
                                isCorrect ? "border-[#34E8B0] text-[#34E8B0]"
                                : isWrong  ? "border-red-500 text-red-400"
                                : "border-neutral-700 text-neutral-300"
                            )}
                        >
                            <option value="" disabled>Select…</option>
                            {rights.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>
                )
            })}
        </div>
    )
}
