import { cn } from "@/lib/utils"
import { TrueFalseQuestion } from "@/components/quiz/types"

type Props = {
    question: TrueFalseQuestion
    answer?: boolean
    onChange: (val: boolean) => void
    submitted: boolean
}

export function TrueFalse({ question, answer, onChange, submitted }: Props) {
    return (
        <div className="flex gap-4">
            {([true, false] as const).map((val) => {
                const isSelected = answer === val
                const isCorrect  = val === question.answer
                let state = "idle"
                if (submitted) state = isCorrect ? "correct" : isSelected ? "wrong" : "idle"
                else if (isSelected) state = "selected"

                return (
                    <button
                        key={String(val)}
                        disabled={submitted}
                        onClick={() => onChange(val)}
                        className={cn(
                            "flex-1 py-8 rounded-xl border text-base font-semibold transition-all cursor-pointer disabled:cursor-default",
                            state === "idle"     && "border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-800",
                            state === "selected" && "border-[#34E8B0]/60 bg-[#34E8B0]/10 text-white",
                            state === "correct"  && "border-[#34E8B0] bg-[#34E8B0]/15 text-[#34E8B0]",
                            state === "wrong"    && "border-red-500 bg-red-500/10 text-red-400",
                        )}
                    >
                        {val ? "True" : "False"}
                    </button>
                )
            })}
        </div>
    )
}
