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
      <div className="grid gap-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <span>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">⌘ + m</kbd>
            {' '}or{' '}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + m</kbd>
          </span>
          <span>Maximize / minimize current editor</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">⌘ + /</kbd>
            {' '}or{' '}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + /</kbd>
          </span>
          <span>Open / close shortcuts dialog</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">⌘ + S</kbd>
            {' '}or{' '}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + S</kbd>
          </span>
          <span>Run code</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">⌘ + ,</kbd>
            {' '}or{' '}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + ,</kbd>
          </span>
          <span>Focus code editor</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">⌘ + .</kbd>
            {' '}or{' '}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + .</kbd>
          </span>
          <span>Focus assertions editor</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span><kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Esc</kbd></span>
          <span>Exit maximized editor / Close dialog</span>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
