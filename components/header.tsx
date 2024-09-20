import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Github, AlertCircle, RotateCcw, ChevronDown } from 'lucide-react'
import { ResetTestDialog } from '@/components/reset-test-dialog'
import { lsKey } from '@/app/app'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TestLevel } from '@/types/testlevels'

interface HeaderProps {
	theme: 'light' | 'dark'
	toggleTheme: () => void
	onResetTests: () => void
	currentLevel: TestLevel
	onLevelChange: (level: TestLevel) => void
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onResetTests, currentLevel, onLevelChange }) => {
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

	const levels: TestLevel[] = ['beginner', 'intermediate', 'advanced']

	const openGitHubRepo = () => {
		window.open('https://github.com/bbodine1/js-cardio/stargazers', '_blank')
	}

	const openNewIssue = () => {
		window.open('https://github.com/bbodine1/js-cardio/issues/new/choose', '_blank')
	}

	const handleResetClick = () => {
		setIsResetDialogOpen(true)
	}

	const handleResetConfirm = () => {
		localStorage.removeItem(lsKey)
		onResetTests() // Call the callback to update the app
		setIsResetDialogOpen(false)
	}

	const handleResetCancel = () => {
		console.log('cancelled')
		setIsResetDialogOpen(false)
	}

	return (
		<header className="mb-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">JavaScript Cardio</h1>

				<div className="flex-1 flex justify-center">
					{/* Level selector for larger screens */}
					<div className="hidden md:flex gap-2">
						{levels.map(level => (
							<Button
								key={level}
								onClick={() => onLevelChange(level)}
								variant={currentLevel === level ? 'outline' : 'default'}
								size="sm"
								className={theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700 hover:text-white' : ''}
							>
								{level.charAt(0).toUpperCase() + level.slice(1)}
							</Button>
						))}
					</div>

					{/* Dropdown for smaller screens */}
					<div className="md:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}
								>
									{currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{levels.map(level => (
									<DropdownMenuItem
										key={level}
										onSelect={() => onLevelChange(level)}
									>
										{level.charAt(0).toUpperCase() + level.slice(1)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<div className="flex items-center gap-2">
					{/* Existing buttons */}
					<Button
						onClick={openGitHubRepo}
						variant="ghost"
						size="icon"
						aria-label="Open GitHub repository"
						className={theme === 'dark' ? 'text-white hover:bg-gray-800 hover:text-white' : ''}
					>
						<Github className="h-[1.2rem] w-[1.2rem]" />
					</Button>

					<Button
						onClick={handleResetClick}
						variant="ghost"
						size="icon"
						aria-label="Reset"
						className={theme === 'dark' ? 'text-white hover:bg-gray-800 hover:text-white' : ''}
					>
						<RotateCcw className="h-[1.2rem] w-[1.2rem]" />
					</Button>

					<Button
						onClick={openNewIssue}
						variant="ghost"
						size="icon"
						aria-label="Open new issue page"
						className={theme === 'dark' ? 'text-white hover:bg-gray-800 hover:text-white' : ''}
					>
						<AlertCircle className="h-[1.2rem] w-[1.2rem]" />
					</Button>

					<Button
						onClick={toggleTheme}
						variant="ghost"
						size="icon"
						aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
						data-testid="theme-toggle-btn"
						className={theme === 'dark' ? 'text-white hover:bg-gray-800 hover:text-white' : ''}
					>
						{theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
					</Button>
				</div>
			</div>

			<ResetTestDialog
				isOpen={isResetDialogOpen}
				onOpenChange={setIsResetDialogOpen}
				onConfirm={handleResetConfirm}
				onCancel={handleResetCancel}
				theme={theme}
			/>
		</header>
	)
}
