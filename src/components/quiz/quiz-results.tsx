import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getGrade } from "@/components/preview-quiz"
import { Question, AnswerMap, scoreQuestion } from "@/components/quiz/types"
import { Quiz } from "@/app/dashboard/search/quiz/quizzes"

type Props = {
    quiz: Quiz
    questions: Question[]
    answers: AnswerMap
    onClose: () => void
    onRetry: () => void
}

export function QuizResults({ quiz, questions, answers, onClose, onRetry }: Props) {
    const correctCount = questions.filter(q => scoreQuestion(q, answers[q.id])).length
    const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0
    const grade = getGrade(score)

    return (
        <div className="flex h-full">

            {/* Left panel — score summary */}
            <div className="w-72 shrink-0 flex flex-col items-center justify-center gap-6 px-8 border-r border-neutral-800 text-center">
                <DialogTitle className="sr-only">Quiz Results</DialogTitle>

                {/* Score ring */}
                <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-4 border-neutral-800">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-4xl font-bold text-white">{score}%</span>
                        <Badge className={cn("text-xs border", grade.className)}>
                            {grade.label}
                        </Badge>
                    </div>
                </div>

                <div>
                    <p className="text-white font-semibold text-lg leading-snug">{quiz.title}</p>
                    <p className="text-neutral-500 text-sm mt-1">
                        {correctCount} / {questions.length} correct
                    </p>
                </div>

                <Progress
                    value={score}
                    indicatorClassName={
                        score >= 85 ? "bg-[#34E8B0]"
                        : score >= 70 ? "bg-blue-400"
                        : score >= 60 ? "bg-yellow-400"
                        : score >= 50 ? "bg-orange-400"
                        : "bg-red-500"
                    }
                />

                <div className="flex flex-col gap-2 w-full">
                    <Button
                        className="w-full bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                        onClick={onRetry}
                    >
                        Retry Quiz
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-neutral-400 hover:text-white cursor-pointer border border-neutral-800"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </div>

            {/* Right panel — question breakdown */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 py-5 border-b border-neutral-800">
                    <h3 className="text-white font-semibold">Question Breakdown</h3>
                    <p className="text-neutral-500 text-xs mt-0.5">Review each question and your answers</p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                    {questions.map((q, i) => {
                        const correct = scoreQuestion(q, answers[q.id])
                        return (
                            <div
                                key={q.id}
                                className={cn(
                                    "flex items-start gap-3 px-4 py-3 rounded-xl border text-sm",
                                    correct
                                        ? "border-[#34E8B0]/20 bg-[#34E8B0]/5"
                                        : "border-red-500/20 bg-red-500/5"
                                )}
                            >
                                <span className={cn(
                                    "mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                                    correct ? "bg-[#34E8B0]/20 text-[#34E8B0]" : "bg-red-500/20 text-red-400"
                                )}>
                                    {correct ? "✓" : "✗"}
                                </span>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="text-neutral-300 font-medium">
                                        Q{i + 1}. {q.question}
                                    </span>
                                    <span className={cn(
                                        "text-xs capitalize",
                                        correct ? "text-[#34E8B0]/70" : "text-red-400/70"
                                    )}>
                                        {q.type.replace("-", " ")} · {correct ? "Correct" : "Incorrect"}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
