import React from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface ResetTestDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
	onCancel: () => void
	theme: 'light' | 'dark'
}

export const ResetTestDialog: React.FC<ResetTestDialogProps> = ({
	isOpen,
	onOpenChange,
	onConfirm,
	onCancel,
	theme,
}) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
				<DialogHeader>
					<DialogTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
						Are you sure you want to reset all tests?
					</DialogTitle>
					<DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
						This action cannot be undone. All custom tests will be removed and default tests will be restored.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="secondary"
						onClick={onCancel}
						className={
							theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'
						}
					>
						Cancel
					</Button>
					<Button
						variant="default"
						onClick={onConfirm}
						className={theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
					>
						Yes, reset all tests
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
