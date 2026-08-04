import { DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { formatTime } from "@/components/quiz/types"
import { Question } from "@/components/quiz/types"

type Props = {
    title: string
    current: number
    total: number
    timeLeft: number
    question: Question
}

export function QuizModalHeader({ title, current, total, timeLeft, question }: Props) {
    const progress  = total ? ((current + 1) / total) * 100 : 0
    const isLow     = timeLeft <= 60

    return (
        <div className="px-8 pt-6 pb-5 flex flex-col gap-4 border-b border-neutral-800">
            <div className="flex items-center justify-between gap-4">
                <DialogTitle className="text-white text-lg font-semibold line-clamp-1">
                    {title}
                </DialogTitle>

                {/* Timer — turns red + pulses at ≤60s */}
                <div className={cn(
                    "flex items-center gap-1.5 text-2xl font-mono font-bold tabular-nums px-4 py-1.5 rounded-xl transition-all",
                    isLow
                        ? "text-red-400 bg-red-500/10 animate-pulse"
                        : "text-white bg-neutral-800"
                )}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Question progress bar + meta */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Question {current + 1} of {total}</span>
                    <Badge variant="secondary" className="text-white/50 border-white/10 font-normal capitalize">
                        {question.type.replace(/-/g, " ")}
                    </Badge>
                </div>
                <Progress value={progress} />
            </div>
        </div>
    )
}
