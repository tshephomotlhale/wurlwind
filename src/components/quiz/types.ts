// ─── Question type definitions ────────────────────────────────────────────────

export type MultipleChoiceQuestion = {
    id: string
    type: "multiple-choice"
    question: string
    options: string[]
    answer: number
}

export type MultipleAnswerQuestion = {
    id: string
    type: "multiple-answer"
    question: string
    options: string[]
    answers: number[]
}

export type TrueFalseQuestion = {
    id: string
    type: "true-false"
    question: string
    answer: boolean
}

export type MatchingQuestion = {
    id: string
    type: "matching"
    question: string
    pairs: { left: string; right: string }[]
}

export type Question =
    | MultipleChoiceQuestion
    | MultipleAnswerQuestion
    | TrueFalseQuestion
    | MatchingQuestion

// ─── Answer state ─────────────────────────────────────────────────────────────

export type AnswerState = {
    mcAnswer?: number
    maAnswers?: number[]
    tfAnswer?: boolean
    matchAnswers?: Record<string, string>
}

export type AnswerMap = Record<string, AnswerState>

// ─── Scoring ──────────────────────────────────────────────────────────────────

export function scoreQuestion(question: Question, answer: AnswerState | undefined): boolean {
    if (!answer) return false
    switch (question.type) {
        case "multiple-choice":
            return answer.mcAnswer === question.answer
        case "multiple-answer": {
            const sel = [...(answer.maAnswers ?? [])].sort().join(",")
            const cor = [...question.answers].sort().join(",")
            return sel === cor
        }
        case "true-false":
            return answer.tfAnswer === question.answer
        case "matching":
            return question.pairs.every(p => answer.matchAnswers?.[p.left] === p.right)
    }
}

// ─── Timer helpers ────────────────────────────────────────────────────────────

export function parseDuration(duration: string): number {
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1]) * 60 : 300
}

export function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
}
