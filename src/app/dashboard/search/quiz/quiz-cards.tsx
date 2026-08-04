"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/app/dashboard/search/quiz/quizzes";
import PreviewQuiz, { getGrade } from "@/components/preview-quiz";

type Props = {
    quiz: Quiz
}

export function QuizCard({ quiz }: Props) {
    const [open, setOpen] = useState(false);
    const grade = quiz.postmark ? getGrade(quiz.postmark) : null;

    return (
        <>
            <Card className="border-none transition-all duration-300 hover:border-[#34E8B0]/30 hover:-translate-y-1">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                        {quiz.postmark && grade && (
                            <Badge className={`text-xs font-medium border px-2.5 py-0.5 ${grade.className}`}>
                                {quiz.postmark}%
                            </Badge>
                        )}
                        <Badge variant="secondary" className="border-white/10 text-white/50 font-normal">
                            {quiz.level}
                        </Badge>
                    </div>

                    <h3 className="font-semibold text-lg leading-tight text-white group-hover:text-[#34E8B0] transition-colors line-clamp-1">
                        {quiz.title}
                    </h3>
                    <Badge variant="outline" className="border-white/10 text-white/50 font-normal">
                        {quiz.questionCount} Qs
                    </Badge>
                </CardHeader>

                <CardContent className="text-xs line-clamp-2">
                    <p>{quiz.description}</p>
                </CardContent>

                <CardFooter className="pt-0 mt-auto">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="w-full bg-white/5 hover:bg-[#34E8B0] hover:text-black border-none transition-all duration-300 font-medium cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        Preview
                    </Button>
                </CardFooter>
            </Card>

            <PreviewQuiz open={open} onOpenChange={setOpen} quiz={quiz} />
        </>
    );
}
