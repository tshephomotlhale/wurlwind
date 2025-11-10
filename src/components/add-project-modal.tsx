"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Paperclip } from "lucide-react";

export function AddProjectModal({
                                    open,
                                    onOpenChange,
                                }: {
    onOpenChange: (open: boolean) => void;
    open: boolean;
}) {
    const [files, setFiles] = React.useState<File[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prev) => {
                const allFiles = [...prev, ...newFiles];
                return allFiles.slice(0, 5); // limit to 5 files
            });
        }
    };

    const handleRemoveFile = (fileName: string) => {
        setFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-white">
                        Add New Project
                    </DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        Create a new project and upload up to 5 related documents.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    {/* Project Name + Add Files Button */}
                    <div className="space-y-2">
                        <Label htmlFor="project-name" className="text-neutral-300">
                            Project Name
                        </Label>
                        <div className="flex items-center gap-3">
                            <Input
                                id="project-name"
                                placeholder="e.g. MATH101"
                                className="flex-1 placeholder:text-neutral-500 bg-neutral-800 border-neutral-700 text-white"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={triggerFileInput}
                                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                            >
                                <Paperclip className="w-4 h-4" />
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Uploaded Files List */}
                    {files.length > 0 && (
                        <div className="border border-neutral-800 rounded-lg p-3 bg-neutral-850/50 max-h-40 overflow-y-auto">
                            {files.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between text-sm text-neutral-300 border-b border-neutral-800 last:border-none py-1"
                                >
                  <span className="truncate max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {file.name}
                  </span>
                                    <button
                                        onClick={() => handleRemoveFile(file.name)}
                                        className="flex-shrink-0 text-neutral-500 hover:text-red-400 transition"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        size="sm"
                        className="bg-[#34E8B0] hover:bg-[#2fd9a5] text-black font-semibold w-1/3"
                    >
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
