"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
    currentPage: number
    totalPages: number
    onPageChangeAction: (page: number) => void
}

export function QuizPagination({ currentPage, totalPages, onPageChangeAction }: Props) {
    if (totalPages <= 1) return null

    function getVisiblePages(): (number | "ellipsis")[] {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const pages: (number | "ellipsis")[] = [1]

        if (currentPage > 3) pages.push("ellipsis")

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)
        for (let i = start; i <= end; i++) pages.push(i)

        if (currentPage < totalPages - 2) pages.push("ellipsis")

        pages.push(totalPages)

        return pages
    }

    const visible = getVisiblePages()

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && onPageChangeAction(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                    />
                </PaginationItem>

                {visible.map((item, idx) =>
                    item === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${idx}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                isActive={item === currentPage}
                                onClick={() => onPageChangeAction(item)}
                                className="cursor-pointer"
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => currentPage < totalPages && onPageChangeAction(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
