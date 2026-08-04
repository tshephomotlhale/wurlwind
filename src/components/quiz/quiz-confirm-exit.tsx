import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

export function QuizConfirmExit({ open, onOpenChange, onConfirm }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-white">Exit quiz?</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        Your progress will be lost and the quiz will not be scored. Are you sure you want to leave?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 pt-2">
                    <Button
                        variant="ghost"
                        className="text-neutral-400 hover:text-white cursor-pointer"
                        onClick={() => onOpenChange(false)}
                    >
                        Keep going
                    </Button>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
                        onClick={onConfirm}
                    >
                        Exit quiz
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
