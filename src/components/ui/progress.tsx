import { cn } from "@/lib/utils"

type ProgressProps = {
    value: number        // 0–100
    className?: string
    indicatorClassName?: string
}

export function Progress({ value, className, indicatorClassName }: ProgressProps) {
    const clamped = Math.min(100, Math.max(0, value))
    return (
        <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-neutral-800", className)}>
            <div
                className={cn("h-full rounded-full bg-[#34E8B0] transition-all duration-300", indicatorClassName)}
                style={{ width: `${clamped}%` }}
            />
        </div>
    )
}
