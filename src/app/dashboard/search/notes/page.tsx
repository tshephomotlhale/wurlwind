"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Note = {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
};

const INITIAL_NOTES: Note[] = [
    {
        id: "1",
        title: "Chapter 4 — Sorting Algorithms",
        content:
            "## Sorting Algorithms\n\n**Bubble Sort** — O(n²) worst case. Simple but slow for large inputs.\n\n**Merge Sort** — O(n log n) always. Divide and conquer. Stable sort.\n\n**Quick Sort** — O(n log n) average, O(n²) worst case. In-place but not stable.\n\n**Heap Sort** — O(n log n). Uses a max-heap. Not stable.\n\n### Key takeaways\n- Prefer Merge Sort when stability matters\n- Quick Sort is fastest in practice for random data\n- Avoid Bubble Sort on large datasets",
        updatedAt: "2 hours ago",
    },
    {
        id: "2",
        title: "Lecture 7 Notes — Binary Trees",
        content:
            "## Binary Trees\n\nA **binary tree** is a tree data structure where each node has at most two children (left and right).\n\n### Traversal methods\n- **In-order** (L → Root → R): gives sorted output on BST\n- **Pre-order** (Root → L → R): useful for copying the tree\n- **Post-order** (L → R → Root): useful for deletion\n\n### Binary Search Tree (BST)\n- Left child < parent, right child > parent\n- Search, insert, delete: O(log n) average, O(n) worst",
        updatedAt: "Yesterday",
    },
    {
        id: "3",
        title: "Exam Prep — Data Structures Summary",
        content:
            "## Data Structures Quick Reference\n\n| Structure | Access | Search | Insert | Delete |\n|-----------|--------|--------|--------|--------|\n| Array     | O(1)   | O(n)   | O(n)   | O(n)   |\n| Linked List | O(n) | O(n)   | O(1)   | O(1)   |\n| Hash Table | O(1)  | O(1)   | O(1)   | O(1)   |\n| BST       | O(log n)| O(log n)| O(log n)| O(log n)|\n\n> Remember: hash table performance depends on the hash function quality.",
        updatedAt: "3 days ago",
    },
];

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
    const [activeId, setActiveId] = useState<string>(INITIAL_NOTES[0].id);
    const [editTitle, setEditTitle] = useState(INITIAL_NOTES[0].title);
    const [editContent, setEditContent] = useState(INITIAL_NOTES[0].content);

    const activeNote = notes.find((n) => n.id === activeId) ?? null;

    function selectNote(note: Note) {
        // save current before switching
        setNotes((prev) =>
            prev.map((n) =>
                n.id === activeId
                    ? { ...n, title: editTitle, content: editContent, updatedAt: "Just now" }
                    : n
            )
        );
        setActiveId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    }

    function createNote() {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "Untitled Note",
            content: "",
            updatedAt: "Just now",
        };
        setNotes((prev) => [newNote, ...prev]);
        setActiveId(newNote.id);
        setEditTitle(newNote.title);
        setEditContent(newNote.content);
    }

    function deleteNote(id: string) {
        const remaining = notes.filter((n) => n.id !== id);
        setNotes(remaining);
        if (activeId === id && remaining.length > 0) {
            setActiveId(remaining[0].id);
            setEditTitle(remaining[0].title);
            setEditContent(remaining[0].content);
        }
    }

    return (
        <div className="flex h-full min-h-[60vh] gap-0 rounded-xl overflow-hidden border border-neutral-800">
            {/* Sidebar — note list */}
            <div className="w-56 shrink-0 flex flex-col border-r border-neutral-800 bg-neutral-900/50">
                <div className="flex items-center justify-between px-3 py-3 border-b border-neutral-800">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        Notes
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                        onClick={createNote}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {notes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-12 px-4 text-center">
                            <FileText className="h-8 w-8 text-neutral-700" />
                            <p className="text-xs text-neutral-600">No notes yet</p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <button
                                key={note.id}
                                onClick={() => selectNote(note)}
                                className={cn(
                                    "w-full text-left px-3 py-2.5 border-b border-neutral-800/50 transition group",
                                    activeId === note.id
                                        ? "bg-[#34E8B0]/10"
                                        : "hover:bg-neutral-800/50"
                                )}
                            >
                                <div className="flex items-start justify-between gap-1">
                                    <p
                                        className={cn(
                                            "text-xs font-medium line-clamp-1 flex-1",
                                            activeId === note.id
                                                ? "text-[#34E8B0]"
                                                : "text-neutral-300"
                                        )}
                                    >
                                        {note.title}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(note.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-red-400 transition shrink-0"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Clock className="h-2.5 w-2.5 text-neutral-600" />
                                    <span className="text-[10px] text-neutral-600">{note.updatedAt}</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Editor */}
            {activeNote ? (
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Title bar */}
                    <div className="px-6 pt-5 pb-3 border-b border-neutral-800">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Note title"
                            className="w-full bg-transparent text-white text-lg font-semibold placeholder:text-neutral-600 focus:outline-none"
                        />
                    </div>

                    {/* Content area */}
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Start writing your note... Markdown is supported."
                        className="flex-1 resize-none bg-transparent text-neutral-300 text-sm leading-relaxed placeholder:text-neutral-700 focus:outline-none px-6 py-4"
                    />

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-xs text-neutral-600">
                            {editContent.length} characters
                        </span>
                        <Button
                            size="sm"
                            className="bg-[#34E8B0] hover:bg-[#2fd9a5] text-black font-semibold cursor-pointer"
                            onClick={() =>
                                setNotes((prev) =>
                                    prev.map((n) =>
                                        n.id === activeId
                                            ? { ...n, title: editTitle, content: editContent, updatedAt: "Just now" }
                                            : n
                                    )
                                )
                            }
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
                    <FileText className="h-10 w-10 text-neutral-700" />
                    <p className="text-sm text-neutral-500">Select a note or create one</p>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="border border-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
                        onClick={createNote}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        New Note
                    </Button>
                </div>
            )}
        </div>
    );
}
