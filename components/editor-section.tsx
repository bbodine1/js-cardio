import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Undo, Minimize2, Maximize2, Focus } from 'lucide-react'

interface EditorSectionProps {
  title: string
  value: string
  onChange: (value: string) => void
  onReset: () => void
  maximizedEditor: 'code' | 'assertions' | null
  editorType: 'code' | 'assertions'
  toggleMaximizedEditor: (editor: 'code' | 'assertions') => void
  editorTheme: any
  editorRef: React.RefObject<HTMLElement>
  currentTest: any
  onFocus: () => void
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  title,
  value,
  onChange,
  onReset,
  maximizedEditor,
  editorType,
  toggleMaximizedEditor,
  editorTheme,
  editorRef,
  currentTest,
  onFocus,
}) => {
  const isMaximized = maximizedEditor === editorType

  return (
    <section
      ref={editorRef}
      className={isMaximized ? 'col-span-2' : ''}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="mb-2">{title}</h2>
        <div className="flex gap-2">
          <Button
            onClick={onReset}
            variant="ghost"
            size="sm"
            disabled={!currentTest}
          >
            <Undo
              className="h-4 w-4 mr-1"
              aria-hidden="true"
            />
            Reset
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onFocus}
                  variant="ghost"
                  size="sm"
                  aria-label={`Focus ${title.toLowerCase()}`}
                >
                  <Focus
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle focus {editorType === 'code' ? '(⌘, or Ctrl+,)' : '(⌘. or Ctrl+.)'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => toggleMaximizedEditor(editorType)}
                  variant="ghost"
                  size="sm"
                  aria-label={isMaximized ? `Minimize ${title.toLowerCase()}` : `Maximize ${title.toLowerCase()}`}
                >
                  {isMaximized ? (
                    <Minimize2
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <Maximize2
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMaximized ? 'Minimize (Esc)' : 'Maximize (⌘M or Ctrl+M)'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CodeMirror
        value={value}
        height={isMaximized ? 'calc(100vh - 400px)' : '200px'}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={editorTheme}
        aria-label={`${title.toLowerCase()}`}
      />
    </section>
  )
}
