"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/app/dashboard/search/quiz/quizzes";
import QuizModal from "@/components/quiz-modal";

type Grade = {
    label: string
    className: string
}

function getGrade(postmark: number): Grade {
    if (postmark >= 85) return { label: "Distinction", className: "bg-[#34E8B0]/15 text-[#34E8B0] border-[#34E8B0]/20" }
    if (postmark >= 70) return { label: "Merit",       className: "bg-blue-500/15 text-blue-400 border-blue-500/20" }
    if (postmark >= 60) return { label: "Credit",      className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" }
    if (postmark >= 50) return { label: "Pass",        className: "bg-orange-500/15 text-orange-400 border-orange-500/20" }
    return               { label: "Fail",              className: "bg-red-500/15 text-red-400 border-red-500/20" }
}

export { getGrade }
export type { Grade }

export default function PreviewQuiz({
    open,
    onOpenChange,
    quiz,
}: {
    onOpenChange: (open: boolean) => void;
    open: boolean;
    quiz: Quiz | null;
}) {
    const [quizOpen, setQuizOpen] = useState(false);

    if (!quiz) return null;

    const grade = quiz.postmark ? getGrade(quiz.postmark) : null;

    function handleStart() {
        onOpenChange(false);       // close preview
        setQuizOpen(true);         // open quiz
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Badge variant="secondary" className="text-white/50 border-white/10 font-normal">
                                {quiz.level}
                            </Badge>
                            <Badge variant="outline" className="text-white/50 border-white/10 font-normal">
                                {quiz.questionCount} Questions
                            </Badge>
                        </div>
                        <DialogTitle className="text-white text-xl">{quiz.title}</DialogTitle>
                        <DialogDescription className="text-neutral-400 text-sm leading-relaxed">
                            {quiz.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2 py-2 text-sm text-neutral-400">
                        <div className="flex justify-between">
                            <span>Topic</span>
                            <span className="text-white">{quiz.topic}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Duration</span>
                            <span className="text-white">{quiz.duration}</span>
                        </div>
                        {quiz.postmark && grade && (
                            <div className="flex justify-between items-center">
                                <span>Last attempt</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white">{quiz.postmark}%</span>
                                    <Badge className={`text-xs font-medium border ${grade.className}`}>
                                        {grade.label}
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 pt-2">
                        <Button
                            variant="ghost"
                            className="text-neutral-400 hover:text-white cursor-pointer"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                            onClick={handleStart}
                        >
                            {quiz.postmark ? "Retry Quiz" : "Start Quiz"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <QuizModal open={quizOpen} onOpenChange={setQuizOpen} quiz={quiz} />
        </>
    );
}
