"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { movatif } from "@/app/fonts";
import Image from "next/image";
import { X, FileText } from "lucide-react";
import * as React from "react";
import WorkspaceTabs from "@/components/workspacetabs";

export default function AppInput() {
    const [query, setQuery] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [query]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments((prev) => [...prev, ...newFiles].slice(0, 5)); // limit to 5
        }
    };

    const handleRemoveAttachment = (name: string) => {
        setAttachments((prev) => prev.filter((file) => file.name !== name));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };


    return (
        <div className="flex flex-col items-center justify-center w-full">





            {/* Input Container */}
            <div className="flex flex-col items-center w-full max-w-2xl bg-neutral-900/70 border-none rounded-xl gap-2 p-4">
                {/* Uploaded Attachments Preview */}
                {attachments.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-4 max-w-xl">
                        {attachments.map((file, idx) => {
                            const isImage = file.type.startsWith("image/");
                            return (
                                <div
                                    key={idx}
                                    className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/60 flex items-center justify-center"
                                >
                                    {isImage ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-neutral-400 text-xs">
                                            <FileText className="w-6 h-6 mb-1" />
                                            <span className="truncate w-20 text-center px-1">
                                            {file.name}
                                        </span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleRemoveAttachment(file.name)}
                                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-neutral-300 hover:text-white rounded-full p-1"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Textarea */}
                <textarea
                    ref={textAreaRef}
                    placeholder="Ask anything. Type @ for mentions."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={1}
                    className="w-full resize-none overflow-hidden bg-transparent border-none focus-visible:ring-0 focus:outline-none focus-visible:outline-none placeholder:text-neutral-500 text-white rounded-xl p-3 leading-relaxed max-h-[300px]"
                />

                <div className="flex justify-between items-center w-full">
                    {/* Attach Button */}
                    <Button
                        variant="ghost"
                        onClick={triggerFileInput}
                        className="p-2 rounded-xl"
                    >
                        <Image
                            src="/Icons/Paperclip.svg"
                            width={16}
                            height={16}
                            alt="Attachment"
                        />
                    </Button>

                    {/* Mic + Submit Buttons */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="p-2 rounded-xl">
                            <Image
                                src="/Icons/Microphone Large.svg"
                                width={18}
                                height={18}
                                alt="Dictate"
                            />
                        </Button>
                        <Button className="p-2 rounded-xl bg-[#34E8B0] hover:bg-[#2fd9a5]">
                            <Image
                                src="/Icons/Soundwave.svg"
                                width={18}
                                height={18}
                                alt="Record"
                            />
                        </Button>
                    </div>
                </div>
            </div>


        </div>
    );
}
