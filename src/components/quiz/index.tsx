"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Quiz } from "@/app/dashboard/search/quiz/quizzes"
import { getQuestionsForQuiz } from "@/app/dashboard/search/quiz/quiz-questions"
import { Question, AnswerMap, AnswerState, scoreQuestion, parseDuration } from "@/components/quiz/types"
import { QuizModalHeader } from "@/components/quiz/quiz-modal-header"
import { QuizResults } from "@/components/quiz/quiz-results"
import { QuizConfirmExit } from "@/components/quiz/quiz-confirm-exit"
import { MultipleChoice } from "@/components/quiz/multiple-choice"
import { MultipleAnswer } from "@/components/quiz/multiple-answer"
import { TrueFalse } from "@/components/quiz/true-false"
import { Matching } from "@/components/quiz/matching"

type Phase = "question" | "results"

export default function QuizModal({
    open,
    onOpenChange,
    quiz,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    quiz: Quiz | null
}) {
    const [phase, setPhase]           = useState<Phase>("question")
    const [current, setCurrent]       = useState(0)
    const [answers, setAnswers]       = useState<AnswerMap>({})
    const [submitted, setSubmitted]   = useState(false)
    const [timeLeft, setTimeLeft]     = useState(0)
    const [questions, setQuestions]   = useState<Question[]>([])
    const [confirmExit, setConfirmExit] = useState(false)

    // Reset when modal opens
    useEffect(() => {
        if (open && quiz) {
            const qs = getQuestionsForQuiz(quiz.id)
            setQuestions(qs)
            setCurrent(0)
            setAnswers({})
            setSubmitted(false)
            setPhase("question")
            setTimeLeft(parseDuration(quiz.duration))
        }
    }, [open, quiz])

    // Countdown timer — auto-submits when time runs out
    useEffect(() => {
        if (!open || phase !== "question") return
        if (timeLeft <= 0) { setPhase("results"); return }
        const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
        return () => clearInterval(id)
    }, [open, phase, timeLeft])

    const question = questions[current]

    // ── Answer helpers ────────────────────────────────────────────────────────

    const setMC = (idx: number) =>
        setAnswers(a => ({ ...a, [question.id]: { ...a[question.id], mcAnswer: idx } }))

    const setTF = (val: boolean) =>
        setAnswers(a => ({ ...a, [question.id]: { ...a[question.id], tfAnswer: val } }))

    const toggleMA = (idx: number) =>
        setAnswers(a => {
            const prev = a[question.id]?.maAnswers ?? []
            const next = prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
            return { ...a, [question.id]: { ...a[question.id], maAnswers: next } }
        })

    const setMatch = (left: string, right: string) =>
        setAnswers(a => ({
            ...a,
            [question.id]: {
                ...a[question.id],
                matchAnswers: { ...(a[question.id]?.matchAnswers ?? {}), [left]: right },
            },
        }))

    // ── Navigation ────────────────────────────────────────────────────────────

    const canConfirm = useCallback(() => {
        if (!question) return false
        const a: AnswerState | undefined = answers[question.id]
        if (!a) return false
        if (question.type === "multiple-choice") return a.mcAnswer !== undefined
        if (question.type === "multiple-answer") return (a.maAnswers?.length ?? 0) > 0
        if (question.type === "true-false")      return a.tfAnswer !== undefined
        if (question.type === "matching")        return question.pairs.every(p => a.matchAnswers?.[p.left])
        return false
    }, [question, answers])

    function handleConfirm() { setSubmitted(true) }

    function handleNext() {
        if (current + 1 >= questions.length) {
            setPhase("results")
        } else {
            setCurrent(c => c + 1)
            setSubmitted(false)
        }
    }

    function handleRetry() {
        if (!quiz) return
        setCurrent(0)
        setAnswers({})
        setSubmitted(false)
        setPhase("question")
        setTimeLeft(parseDuration(quiz.duration))
    }

    function handleExitConfirmed() {
        setConfirmExit(false)
        onOpenChange(false)
    }

    // ── Intercept close attempts during active quiz ───────────────────────────

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen && phase === "question" && questions.length > 0) {
            setConfirmExit(true)
            return
        }
        onOpenChange(nextOpen)
    }

    if (!quiz) return null

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent
                    showCloseButton={false}
                    className="bg-neutral-900 border border-neutral-800 rounded-2xl p-0 w-[85vw] max-w-[85vw] h-[85vh] max-h-[85vh] overflow-hidden flex flex-col gap-0"
                >
                    {phase === "question" && question && (
                        <>
                            <QuizModalHeader
                                title={quiz.title}
                                current={current}
                                total={questions.length}
                                timeLeft={timeLeft}
                                question={question}
                            />

                            {/* Question body */}
                            <div className="flex-1 overflow-y-auto px-8 py-6">
                                <p className="text-white font-medium text-base mb-6 leading-relaxed">
                                    {question.question}
                                </p>

                                {question.type === "multiple-choice" && (
                                    <MultipleChoice
                                        question={question}
                                        answer={answers[question.id]?.mcAnswer}
                                        onChange={setMC}
                                        submitted={submitted}
                                    />
                                )}
                                {question.type === "multiple-answer" && (
                                    <MultipleAnswer
                                        question={question}
                                        answers={answers[question.id]?.maAnswers ?? []}
                                        onChange={toggleMA}
                                        submitted={submitted}
                                    />
                                )}
                                {question.type === "true-false" && (
                                    <TrueFalse
                                        question={question}
                                        answer={answers[question.id]?.tfAnswer}
                                        onChange={setTF}
                                        submitted={submitted}
                                    />
                                )}
                                {question.type === "matching" && (
                                    <Matching
                                        question={question}
                                        matchAnswers={answers[question.id]?.matchAnswers ?? {}}
                                        onChange={setMatch}
                                        submitted={submitted}
                                    />
                                )}

                                {/* Per-question feedback */}
                                {submitted && (
                                    <div className={cn(
                                        "mt-5 px-4 py-3 rounded-xl text-sm border",
                                        scoreQuestion(question, answers[question.id])
                                            ? "border-[#34E8B0]/30 bg-[#34E8B0]/10 text-[#34E8B0]"
                                            : "border-red-500/30 bg-red-500/10 text-red-400"
                                    )}>
                                        {scoreQuestion(question, answers[question.id])
                                            ? "✓ Correct!"
                                            : "✗ Incorrect — review the highlighted answer above."}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                                <Button
                                    variant="ghost"
                                    className="text-neutral-500 hover:text-white cursor-pointer"
                                    onClick={() => setConfirmExit(true)}
                                >
                                    Exit quiz
                                </Button>

                                <div className="flex gap-2">
                                    {!submitted ? (
                                        <Button
                                            className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                                            disabled={!canConfirm()}
                                            onClick={handleConfirm}
                                        >
                                            Confirm
                                        </Button>
                                    ) : (
                                        <Button
                                            className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                                            onClick={handleNext}
                                        >
                                            {current + 1 >= questions.length ? "See Results" : "Next Question →"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {phase === "results" && (
                        <QuizResults
                            quiz={quiz}
                            questions={questions}
                            answers={answers}
                            onClose={() => onOpenChange(false)}
                            onRetry={handleRetry}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Exit confirmation — rendered outside the main dialog */}
            <QuizConfirmExit
                open={confirmExit}
                onOpenChange={setConfirmExit}
                onConfirm={handleExitConfirmed}
            />
        </>
    )
}
