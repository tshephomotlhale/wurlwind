import { cn } from "@/lib/utils"
import { MultipleAnswerQuestion } from "@/components/quiz/types"

type Props = {
    question: MultipleAnswerQuestion
    answers: number[]
    onChange: (idx: number) => void
    submitted: boolean
}

export function MultipleAnswer({ question, answers, onChange, submitted }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-xs text-neutral-500">Select all that apply</p>
            {question.options.map((opt, idx) => {
                const isSelected = answers.includes(idx)
                const isCorrect  = question.answers.includes(idx)
                let state = "idle"
                if (submitted) state = isCorrect ? "correct" : isSelected ? "wrong" : "idle"
                else if (isSelected) state = "selected"

                return (
                    <button
                        key={idx}
                        disabled={submitted}
                        onClick={() => onChange(idx)}
                        className={cn(
                            "w-full text-left px-5 py-4 rounded-xl border text-sm transition-all cursor-pointer disabled:cursor-default",
                            state === "idle"     && "border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-800",
                            state === "selected" && "border-[#34E8B0]/60 bg-[#34E8B0]/10 text-white",
                            state === "correct"  && "border-[#34E8B0] bg-[#34E8B0]/15 text-[#34E8B0]",
                            state === "wrong"    && "border-red-500 bg-red-500/10 text-red-400",
                        )}
                    >
                        <span className="flex items-center gap-4">
                            <span className={cn(
                                "w-5 h-5 rounded border text-xs flex items-center justify-center shrink-0",
                                state === "idle"     && "border-neutral-600",
                                state === "selected" && "border-[#34E8B0] bg-[#34E8B0]/20 text-[#34E8B0]",
                                state === "correct"  && "border-[#34E8B0] bg-[#34E8B0] text-black",
                                state === "wrong"    && "border-red-500 bg-red-500/20 text-red-400",
                            )}>
                                {(isSelected || (submitted && isCorrect)) ? "✓" : ""}
                            </span>
                            {opt}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
