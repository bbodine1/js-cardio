import React from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Github, AlertCircle } from 'lucide-react'

interface HeaderProps {
	theme: 'light' | 'dark'
	toggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
	const openGitHubRepo = () => {
		window.open('https://github.com/bbodine1/js-cardio/stargazers', '_blank')
	}

	const openNewIssue = () => {
		window.open('https://github.com/bbodine1/js-cardio/issues/new/choose', '_blank')
	}

	return (
		<header>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">JavaScript Cardio</h1>

				<div className="flex gap-2">
					<Button
						onClick={openGitHubRepo}
						variant={theme === 'dark' ? 'ghost' : 'default'}
						size="icon"
						aria-label="Open GitHub repository"
					>
						<Github className="h-[1.2rem] w-[1.2rem]" />
					</Button>

					<Button
						onClick={openNewIssue}
						variant={theme === 'dark' ? 'ghost' : 'default'}
						size="icon"
						aria-label="Open new issue page"
					>
						<AlertCircle className="h-[1.2rem] w-[1.2rem]" />
					</Button>

					<Button
						onClick={toggleTheme}
						variant={theme === 'dark' ? 'ghost' : 'default'}
						size="icon"
						aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
						data-testid="theme-toggle-btn"
					>
						{theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
					</Button>
				</div>
			</div>
		</header>
	)
}
