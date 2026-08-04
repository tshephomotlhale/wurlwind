import { cn } from "@/lib/utils"
import Image from "next/image"

type EmptyProps = {
    icon?: string
    title?: string
    description?: string
    className?: string
}

export function Empty({
    icon = "/Icons/Rounded Magnifer Zoom In.svg",
    title = "No results found",
    description = "Try adjusting your search or filter to find what you're looking for.",
    className,
}: EmptyProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-3 py-20 text-center", className)}>
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-800/60">
                <Image
                    src={icon}
                    width={24}
                    height={24}
                    alt=""
                    className="opacity-40"
                />
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-xs text-neutral-500 max-w-xs">{description}</p>
            </div>
        </div>
    )
}
