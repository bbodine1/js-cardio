import React from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">JavaScript Cardio</h1>

        <Button
          onClick={toggleTheme}
          variant={theme === 'dark' ? 'ghost' : 'default'}
          size="icon"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          data-testid="theme-toggle-btn"
        >
          {theme === 'light' ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </header>
  )
}
