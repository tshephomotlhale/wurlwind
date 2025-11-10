"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const quizzes = [
    {
        id: 1,
        title: "AWS Cloud Practitioner Essentials",
        questions: 12,
    },
    {
        id: 2,
        title: "Data Structures & Algorithms",
        questions: 20,
    },
    {
        id: 3,
        title: "Ethical AI Principles",
        questions: 15,
    },
    {
        id: 4,
        title: "AI in Education",
        questions: 10,
    },
];

export default function QuizListPage() {
    return (
        <div className="flex flex-col gap-4 max-w-xl mx-auto w-full pb-16">
            <h2 className="text-xl font-semibold text-white mb-2">Your Quizzes</h2>

            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <Card
                        key={quiz.id}
                        className="bg-neutral-900/60 border border-neutral-900/60 hover:border-1 hover:border-[#34E8B0]/50 transition-all rounded-xl group"
                    >
                        <CardHeader className="flex flex-row items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-[#34E8B0]/10">
                                    <Image
                                        src="/Icons/File.svg"
                                        width={20}
                                        height={20}
                                        alt="Quiz Icon"
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-sm font-medium">
                                        {quiz.title}
                                    </CardTitle>
                                    <p className="text-neutral-400 text-xs">
                                        {quiz.questions} questions
                                    </p>
                                </div>
                            </div>

                            {/* Dots Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-neutral-400 hover:text-[#34E8B0] hover:bg-[#34E8B0]/10 rounded-md"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-36 bg-neutral-900 border border-neutral-800 text-sm text-white"
                                >
                                    <DropdownMenuItem className="hover:bg-[#34E8B0]/10 cursor-pointer">
                                        Open
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-[#34E8B0]/10 cursor-pointer">
                                        Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-[#34E8B0]/10 cursor-pointer">
                                        Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                    </Card>
                ))
            ) : (
                <div className="text-center text-neutral-500 mt-10">
                    No quizzes yet. Generate one using your workspace prompts.
                </div>
            )}
        </div>
    );
}
