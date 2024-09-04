import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface SaveConfirmationDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  theme: 'light' | 'dark'
  pendingTestSelection: string | 'new' | null
  onSave: () => void
  onDontSave: () => void
}

export const SaveConfirmationDialog: React.FC<SaveConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
  theme,
  pendingTestSelection,
  onSave,
  onDontSave,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
      <DialogHeader>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogDescription>
          You have unsaved changes. Do you want to save them before{' '}
          {pendingTestSelection === 'new' ? 'creating a new test' : 'switching tests'}?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="secondary"
          onClick={onDontSave}
          className={theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'}
        >
          Don&apos;t Save
        </Button>
        <Button onClick={onSave}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
