"use client"

import { useMemo, useState } from "react"
import { quizzes} from "@/app/dashboard/search/quiz/quizzes";
import { QuizGrid} from "@/app/dashboard/search/quiz/quiz-grid";
import { QuizHeader} from "@/app/dashboard/search/quiz/quiz-header";
import { QuizPagination} from "@/app/dashboard/search/quiz/pagination-custom";

const ITEMS_PER_PAGE = 9

export default function QuizzesPage() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")

    const filteredQuizzes = useMemo(() => {
        return quizzes.filter((quiz) => {
            const matchesSearch = quiz.title
                .toLowerCase()
                .includes(search.toLowerCase())

            const matchesFilter =
                filter === "all"
                    ? true
                    : quiz.level.toLowerCase() === filter

            return matchesSearch && matchesFilter
        })
    }, [search, filter])

    const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE)

    const paginatedQuizzes = filteredQuizzes.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className="space-y-5 mx-auto max-w-full w-full px-4">
            <QuizHeader
                onSearchAction={(val) => { setSearch(val); setPage(1); }}
                onFilterChangeAction={(val) => { setFilter(val); setPage(1); }}
            />

            <QuizGrid quizzes={paginatedQuizzes} isFiltered={search.trim() !== "" || filter !== "all"} />

            {filteredQuizzes.length > 0 && (
                <QuizPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChangeAction={setPage}
                />
            )}
        </div>
    )
}
