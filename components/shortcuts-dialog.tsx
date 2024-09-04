import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from "@/lib/utils"

interface ShortcutsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  theme: 'light' | 'dark'
}

export const ShortcutsDialog: React.FC<ShortcutsDialogProps> = ({ isOpen, onOpenChange, theme }) => (
  <Dialog
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <DialogContent className={cn("sm:max-w-[600px]", theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black')}>
      <DialogHeader>
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogDescription>Here are all the available keyboard shortcuts:</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">General</h3>
          <ul className="list-disc list-inside">
            <li>⌘/ or Ctrl+/: Toggle this dialog</li>
            <li>⌘S or Ctrl+S: Run Code</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Editors</h3>
          <ul className="list-disc list-inside">
            <li>⌘M or Ctrl+M: Maximize/Minimize focused editor</li>
            <li>Esc: Minimize maximized editor</li>
          </ul>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
