import { Quiz } from "@/app/dashboard/search/quiz/quizzes";
import { QuizCard } from "@/app/dashboard/search/quiz/quiz-cards";
import { Empty } from "@/components/ui/empty";

type Props = {
    quizzes: Quiz[]
    isFiltered?: boolean
}

export function QuizGrid({ quizzes, isFiltered }: Props) {
    if (quizzes.length === 0) {
        return (
            <Empty
                title={isFiltered ? "No practice tests match your search" : "No practice tests available"}
                description={
                    isFiltered
                        ? "Try a different keyword or clear the filter to see all tests."
                        : "Check back later — new practice tests will appear here."
                }
            />
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}
