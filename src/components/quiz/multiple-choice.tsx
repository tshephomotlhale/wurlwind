import { cn } from "@/lib/utils"
import { MultipleChoiceQuestion } from "@/components/quiz/types"

type Props = {
    question: MultipleChoiceQuestion
    answer?: number
    onChange: (idx: number) => void
    submitted: boolean
}

export function MultipleChoice({ question, answer, onChange, submitted }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => {
                const isSelected = answer === idx
                const isCorrect  = idx === question.answer
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
                                "w-7 h-7 rounded-full border text-xs flex items-center justify-center shrink-0 font-semibold",
                                state === "idle"     && "border-neutral-600 text-neutral-500",
                                state === "selected" && "border-[#34E8B0] text-[#34E8B0]",
                                state === "correct"  && "border-[#34E8B0] bg-[#34E8B0] text-black",
                                state === "wrong"    && "border-red-500 bg-red-500 text-white",
                            )}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            {opt}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
