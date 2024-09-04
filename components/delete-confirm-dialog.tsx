import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  theme: 'light' | 'dark'
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  theme,
}) => (
  <Dialog
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <DialogContent className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this test? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="secondary"
          onClick={() => onOpenChange(false)}
          className={theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
