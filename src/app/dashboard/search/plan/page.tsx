"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Circle, ChevronDown, ChevronRight, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type Task = { id: string; label: string; done: boolean };
type Week = { id: string; label: string; dateRange: string; tasks: Task[]; goal: string };

const INITIAL_WEEKS: Week[] = [
    {
        id: "w1",
        label: "Week 1",
        dateRange: "10 Mar – 16 Mar",
        goal: "Foundations — sorting & searching",
        tasks: [
            { id: "t1", label: "Read Chapter 3: Sorting Algorithms", done: true },
            { id: "t2", label: "Complete Sorting Algorithms flashcard deck", done: true },
            { id: "t3", label: "Practice Test: Sorting Algorithms (Beginner)", done: true },
            { id: "t4", label: "Write summary notes on Merge Sort vs Quick Sort", done: false },
        ],
    },
    {
        id: "w2",
        label: "Week 2",
        dateRange: "17 Mar – 23 Mar",
        goal: "Trees & Graphs",
        tasks: [
            { id: "t5", label: "Read Chapter 4: Binary Trees", done: true },
            { id: "t6", label: "Complete Binary Trees flashcard deck", done: false },
            { id: "t7", label: "Practice Test: Binary Trees (Intermediate)", done: false },
            { id: "t8", label: "Implement BST in Python (practice)", done: false },
        ],
    },
    {
        id: "w3",
        label: "Week 3",
        dateRange: "24 Mar – 30 Mar",
        goal: "Hash Tables & Dynamic Programming",
        tasks: [
            { id: "t9",  label: "Read Chapter 5: Hash Tables", done: false },
            { id: "t10", label: "Complete Data Structures flashcard deck", done: false },
            { id: "t11", label: "Practice Test: Data Structures (Intermediate)", done: false },
            { id: "t12", label: "Write exam-prep notes: Data Structures summary", done: false },
        ],
    },
    {
        id: "w4",
        label: "Week 4",
        dateRange: "31 Mar – 6 Apr",
        goal: "Exam revision & mock tests",
        tasks: [
            { id: "t13", label: "Revise all flashcard decks (3 full passes)", done: false },
            { id: "t14", label: "Complete all Practice Tests — target 80%+", done: false },
            { id: "t15", label: "Review weak areas from test results", done: false },
            { id: "t16", label: "Timed mock exam under exam conditions", done: false },
        ],
    },
];

export default function PlanPage() {
    const [weeks, setWeeks] = useState<Week[]>(INITIAL_WEEKS);
    const [expanded, setExpanded] = useState<string[]>(["w1", "w2"]);

    const allTasks = weeks.flatMap((w) => w.tasks);
    const doneTasks = allTasks.filter((t) => t.done).length;
    const totalTasks = allTasks.length;
    const overallProgress = Math.round((doneTasks / totalTasks) * 100);

    function toggleWeek(id: string) {
        setExpanded((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    }

    function toggleTask(weekId: string, taskId: string) {
        setWeeks((prev) =>
            prev.map((w) =>
                w.id !== weekId
                    ? w
                    : {
                        ...w,
                        tasks: w.tasks.map((t) =>
                            t.id === taskId ? { ...t, done: !t.done } : t
                        ),
                    }
            )
        );
    }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#34E8B0]/10">
                            <Target className="h-4 w-4 text-[#34E8B0]" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-white">Study Plan — COMP201</h2>
                            <p className="text-xs text-neutral-500">Exam in 4 weeks · {totalTasks - doneTasks} tasks remaining</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-400">{overallProgress}% complete</span>
                        <Badge
                            className={cn(
                                "text-xs font-medium border",
                                overallProgress >= 75
                                    ? "bg-[#34E8B0]/15 text-[#34E8B0] border-[#34E8B0]/20"
                                    : overallProgress >= 40
                                    ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
                                    : "bg-neutral-700 text-neutral-400 border-neutral-600"
                            )}
                        >
                            {overallProgress >= 75 ? "On track" : overallProgress >= 40 ? "In progress" : "Getting started"}
                        </Badge>
                    </div>
                </div>
                <Progress value={overallProgress} className="h-2 bg-neutral-800 [&>div]:bg-[#34E8B0]" />
            </div>

            {/* Week cards */}
            <div className="space-y-3">
                {weeks.map((week) => {
                    const weekDone = week.tasks.filter((t) => t.done).length;
                    const weekTotal = week.tasks.length;
                    const weekPct = Math.round((weekDone / weekTotal) * 100);
                    const isOpen = expanded.includes(week.id);

                    return (
                        <div
                            key={week.id}
                            className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden"
                        >
                            {/* Week header */}
                            <button
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-800/40 transition text-left"
                                onClick={() => toggleWeek(week.id)}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {isOpen ? (
                                        <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-neutral-500 shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-semibold text-white">{week.label}</span>
                                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                                                <Calendar className="h-3 w-3" />
                                                {week.dateRange}
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-500 truncate">{week.goal}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 ml-4">
                                    <span className="text-xs text-neutral-500">{weekDone}/{weekTotal}</span>
                                    <div className="w-20 hidden sm:block">
                                        <Progress value={weekPct} className="h-1.5 bg-neutral-800 [&>div]:bg-[#34E8B0]" />
                                    </div>
                                    {weekDone === weekTotal && (
                                        <Badge className="bg-[#34E8B0]/15 text-[#34E8B0] border-[#34E8B0]/20 text-xs border">
                                            Done
                                        </Badge>
                                    )}
                                </div>
                            </button>

                            {/* Tasks */}
                            {isOpen && (
                                <div className="border-t border-neutral-800 divide-y divide-neutral-800/50">
                                    {week.tasks.map((task) => (
                                        <button
                                            key={task.id}
                                            onClick={() => toggleTask(week.id, task.id)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-800/30 transition text-left group"
                                        >
                                            <div
                                                className={cn(
                                                    "h-4 w-4 rounded-full border shrink-0 flex items-center justify-center transition",
                                                    task.done
                                                        ? "bg-[#34E8B0] border-[#34E8B0]"
                                                        : "border-neutral-600 group-hover:border-neutral-400"
                                                )}
                                            >
                                                {task.done ? (
                                                    <Check className="h-2.5 w-2.5 text-black" />
                                                ) : (
                                                    <Circle className="h-2 w-2 text-transparent" />
                                                )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm transition",
                                                    task.done
                                                        ? "text-neutral-600 line-through"
                                                        : "text-neutral-300 group-hover:text-white"
                                                )}
                                            >
                                                {task.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer note */}
            <p className="text-xs text-neutral-700 text-center pb-2">
                Tick off tasks as you complete them — your progress is saved locally.
            </p>
        </div>
    );
}
