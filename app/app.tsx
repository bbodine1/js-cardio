'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { X, Plus, Save, Edit, Trash, Play } from 'lucide-react'
import { vscodeLightTheme, vscodeDarkTheme } from '@/app/cm-themes'
import { DEFAULT_TESTS } from './DEFAULT_TESTS'
import { ShortcutsDialog } from '@/components/shortcuts-dialog'
import { DeleteConfirmationDialog } from '@/components/delete-confirm-dialog'
import { Header } from '@/components/header'
import { EditorSection } from '@/components/editor-section'
import { SaveConfirmationDialog } from '@/components/save-confirm-dialog'
import { TestNameDialog } from '@/components/new-test-dialog'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Toaster, toast } from 'react-hot-toast'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Test } from '@/types/tests'
import { TestLevel } from '@/types/testlevels'

export const lsKey = 'jsTests'

export function App() {
	const [code, setCode] = useState(
		'// Write your JavaScript code here\nfunction sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(1, 2));'
	)
	const [assertions, setAssertions] = useState(
		'// Write your assertions here\nassert(sum(1, 2) === 3);\nassert(sum(-1, 1) === 0);'
	)
	const [results, setResults] = useState('')
	const [consoleOutput, setConsoleOutput] = useState('')
	const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
	const [currentTest, setCurrentTest] = useState<Test | null>(null)
	const [dialogState, setDialogState] = useState<{
		isOpen: boolean
		type: 'new' | 'edit'
		title: string
		description: string
		inputValue: string
	}>({
		isOpen: false,
		type: 'new',
		title: '',
		description: '',
		inputValue: '',
	})
	const [isShortcutsDialogOpen, setIsShortcutsDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const [pendingTestSelection, setPendingTestSelection] = useState<string | 'new' | null>(null)
	const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
	const [currentLevel, setCurrentLevel] = useState<TestLevel>('beginner')
	const [pendingLevelChange, setPendingLevelChange] = useState<TestLevel | null>(null)

	const [tests, setTests] = useState<Record<TestLevel, Test[]>>(() => {
		if (typeof window !== 'undefined') {
			const savedTests = localStorage.getItem(lsKey)
			if (savedTests) {
				try {
					return JSON.parse(savedTests)
				} catch (error) {
					console.error('Error parsing saved tests:', error)
				}
			}
		}
		// If no saved tests or parsing failed, return the default tests
		return DEFAULT_TESTS
	})

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(lsKey, JSON.stringify(tests))
		}
	}, [tests])

	useEffect(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		if (!localStorage.getItem('theme')) {
			setTheme(prefersDark ? 'dark' : 'light')
		}
		const testsForLevel = tests[currentLevel]
		if (testsForLevel.length > 0) {
			const firstTest = testsForLevel[0]
			setCurrentTest(firstTest)
			setCode(firstTest.code)
			setAssertions(firstTest.assertions)
		}
	}, [setTheme, tests, currentLevel])

	useEffect(() => {
		localStorage.setItem(lsKey, JSON.stringify(tests))
	}, [tests])

	const runCode = useCallback(() => {
		let output = ''
		const originalLog = console.log
		console.log = (...args) => {
			output += args.join(' ') + '\n'
			originalLog.apply(console, args)
		}

		const assertionResults: string[] = []

		const assertionCount = 0
		const failedAssertions = 0

		try {
			// Combine code and assertions
			const combinedCode = `
        ${code}
        
        function assert(condition, message = 'No message provided') {
          assertionCount++;
          if (!condition) {
            failedAssertions++;
            assertionResults.push(\`❌ Assertion \${assertionCount} failed: \${message}\`);
          } else {
            assertionResults.push(\`✅ Assertion \${assertionCount} passed: \${message}\`);
          }
        }
  
        ${assertions}
      `
			// Run combined code
			eval(combinedCode)
		} catch (error: unknown) {
			if (error instanceof Error) {
				assertionResults.push(`❌ Error: ${error.message}`)
			} else {
				assertionResults.push(`❌ Unknown error occurred`)
			}
		} finally {
			console.log = originalLog
			setConsoleOutput(output)

			let summary = ''
			if (assertionCount === 0) {
				summary = '⚠️ No assertions were found or executed.'
			} else if (failedAssertions > 0) {
				summary = `❌ ${failedAssertions} assertion(s) failed.`
			} else {
				summary = `✅ All ${assertionCount} assertion(s) passed.`
			}
			setResults(`${summary}\n\n${assertionResults.join('\n')}`)
		}
	}, [code, assertions])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 's') {
				event.preventDefault()
				const activeElement = document.activeElement
				if (activeElement && activeElement.closest('.cm-editor')) {
					runCode()
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [runCode])

	const toggleTheme = useCallback(() => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}, [setTheme])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	const clearResults = () => {
		setResults('')
	}

	const clearConsoleOutput = () => {
		setConsoleOutput('')
	}

	const handleDialogSave = () => {
		if (dialogState.type === 'new') {
			if (dialogState.inputValue.trim()) {
				const newTest: Test = {
					id: Date.now().toString(),
					name: dialogState.inputValue,
					code: '// Write your JavaScript code here',
					assertions: '// Write your assertions here',
				}
				setTests(prevTests => ({
					...prevTests,
					[currentLevel]: [...prevTests[currentLevel], newTest],
				}))
				setCurrentTest(newTest)
				setCode(newTest.code)
				setAssertions(newTest.assertions)
				setDialogState(prev => ({ ...prev, isOpen: false }))
				setHasUnsavedChanges(false)
				toast.success('New test created successfully!', {
					duration: 2000,
					position: 'bottom-center',
					style: {
						background: theme === 'dark' ? '#333' : '#fff',
						color: theme === 'dark' ? '#fff' : '#333',
					},
				})
			}
		} else if (dialogState.type === 'edit' && currentTest) {
			setTests(prevTests => ({
				...prevTests,
				[currentLevel]: prevTests[currentLevel].map(test =>
					test.id === currentTest.id ? { ...currentTest, name: dialogState.inputValue } : test
				),
			}))
			setCurrentTest(prev => (prev ? { ...prev, name: dialogState.inputValue } : null))
			setDialogState(prev => ({ ...prev, isOpen: false }))
			toast.success('Test edited successfully!', {
				duration: 2000,
				position: 'bottom-center',
				style: {
					background: theme === 'dark' ? '#333' : '#fff',
					color: theme === 'dark' ? '#fff' : '#333',
				},
			})
		}
	}

	const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleDialogSave()
		}
	}

	const openNewTestDialog = () => {
		if (hasUnsavedChanges) {
			setPendingTestSelection('new')
			setIsSaveDialogOpen(true)
		} else {
			openNewTestDialogDirectly()
		}
	}

	const openNewTestDialogDirectly = () => {
		setDialogState({
			isOpen: true,
			type: 'new',
			title: 'Create New Test',
			description: 'Enter a name for your new test.',
			inputValue: '',
		})
		setResults('') // Clear results
		setConsoleOutput('') // Clear console output
	}

	const openEditTestDialog = () => {
		if (currentTest) {
			setDialogState({
				isOpen: true,
				type: 'edit',
				title: 'Edit Test',
				description: 'Edit the name of your test.',
				inputValue: currentTest.name,
			})
		}
	}

	const saveCurrentTest = () => {
		if (currentTest) {
			setTests(prevTests => ({
				...prevTests,
				[currentLevel]: prevTests[currentLevel].map(test =>
					test.id === currentTest.id ? { ...test, code, assertions } : test
				),
			}))
			setCurrentTest({ ...currentTest, code, assertions })
			setHasUnsavedChanges(false)
			toast.success('Test saved successfully!', {
				duration: 2000,
				position: 'bottom-center',
				style: {
					background: theme === 'dark' ? '#333' : '#fff',
					color: theme === 'dark' ? '#fff' : '#333',
				},
			})
		}
	}

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true)
	}

	const confirmDelete = () => {
		if (currentTest) {
			setTests(prevTests => {
				const updatedTests = prevTests[currentLevel].filter(test => test.id !== currentTest.id)

				// Select the first available test or set to null if no tests remain
				const nextTest = updatedTests.length > 0 ? updatedTests[0] : null

				if (nextTest) {
					setCurrentTest(nextTest)
					setCode(nextTest.code)
					setAssertions(nextTest.assertions)
				} else {
					// If no tests remain, set to default test
					const defaultTest: Test = {
						id: 'default',
						name: 'Default Test',
						code: '// Write your JavaScript code here\nfunction sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(1, 2));',
						assertions: '// Write your assertions here\nassert(sum(1, 2) === 3);\nassert(sum(-1, 1) === 0);',
					}
					setTests(prevTests => ({
						...prevTests,
						[currentLevel]: [defaultTest],
					}))
					setCurrentTest(defaultTest)
					setCode(defaultTest.code)
					setAssertions(defaultTest.assertions)
				}

				setHasUnsavedChanges(false)
				toast.success('Test deleted successfully!', {
					duration: 2000,
					position: 'bottom-center',
					style: {
						background: theme === 'dark' ? '#333' : '#fff',
						color: theme === 'dark' ? '#fff' : '#333',
					},
				})
				return {
					...prevTests,
					[currentLevel]: updatedTests,
				}
			})
		}
		setIsDeleteDialogOpen(false)
	}

	const resetEditor = useCallback(() => {
		if (currentTest) {
			setCode(currentTest.code)
			setAssertions(currentTest.assertions)
		}
	}, [currentTest])

	const handleTestSelection = (testId: string) => {
		if (hasUnsavedChanges) {
			setPendingTestSelection(testId)
			setIsSaveDialogOpen(true)
		} else {
			selectTest(testId)
		}
	}

	const selectTest = (testId: string) => {
		const selected = tests[currentLevel].find(test => test.id === testId)
		if (selected) {
			setCurrentTest(selected)
			setCode(selected.code)
			setAssertions(selected.assertions)
			setHasUnsavedChanges(false)
			setResults('') // Clear results
			setConsoleOutput('') // Clear console output
		}
	}

	const editorTheme = theme === 'dark' ? vscodeDarkTheme : vscodeLightTheme

	const [maximizedEditor, setMaximizedEditor] = useState<'code' | 'assertions' | null>(null)

	const toggleMaximizedEditor = useCallback((editor: 'code' | 'assertions') => {
		setMaximizedEditor(prev => (prev === editor ? null : editor))
	}, [])

	const codeEditorRef = useRef<HTMLDivElement>(null)
	const assertionsEditorRef = useRef<HTMLDivElement>(null)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const isEditorFocused =
				codeEditorRef.current?.contains(document.activeElement) ||
				assertionsEditorRef.current?.contains(document.activeElement)

			if (event.metaKey || event.ctrlKey) {
				if (event.key === 'm') {
					event.preventDefault()
					const activeElement = document.activeElement
					if (codeEditorRef.current?.contains(activeElement)) {
						toggleMaximizedEditor('code')
					} else if (assertionsEditorRef.current?.contains(activeElement)) {
						toggleMaximizedEditor('assertions')
					}
				} else if (event.key === '/' && !isEditorFocused) {
					event.preventDefault()
					setIsShortcutsDialogOpen(prev => !prev)
				} else if (event.key === ',') {
					event.preventDefault()
					const codeContent = codeEditorRef.current?.querySelector('.cm-content') as HTMLElement
					codeContent?.focus()
				} else if (event.key === '.') {
					event.preventDefault()
					const assertionsContent = assertionsEditorRef.current?.querySelector('.cm-content') as HTMLElement
					assertionsContent?.focus()
				}
			} else if (event.key === 'Escape') {
				if (maximizedEditor) {
					event.preventDefault()
					setMaximizedEditor(null)
				} else if (isShortcutsDialogOpen) {
					setIsShortcutsDialogOpen(false)
				}
			}
		},
		[toggleMaximizedEditor, maximizedEditor, isShortcutsDialogOpen]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	const handleSaveConfirmation = () => {
		saveCurrentTest()
		setIsSaveDialogOpen(false)
		if (pendingTestSelection === 'new') {
			openNewTestDialogDirectly()
		} else if (pendingTestSelection) {
			selectTest(pendingTestSelection)
		} else if (pendingLevelChange) {
			switchToNewLevel(pendingLevelChange)
		}
		setPendingLevelChange(null)
	}

	const handleDontSave = () => {
		setIsSaveDialogOpen(false)
		if (pendingTestSelection === 'new') {
			openNewTestDialogDirectly()
		} else if (pendingTestSelection) {
			selectTest(pendingTestSelection)
		} else if (pendingLevelChange) {
			switchToNewLevel(pendingLevelChange)
		}
		setPendingLevelChange(null)
		setHasUnsavedChanges(false)
	}

	const handleCodeChange = (value: string) => {
		setCode(value)
		setHasUnsavedChanges(true)
	}

	const handleAssertionsChange = (value: string) => {
		setAssertions(value)
		setHasUnsavedChanges(true)
	}

	const isSmallScreen = useMediaQuery('(max-width: 640px)')

	const handleLevelChange = (newLevel: TestLevel) => {
		if (hasUnsavedChanges) {
			setPendingTestSelection(null) // Clear any pending test selection
			setIsSaveDialogOpen(true)
			// Store the new level to switch to after save confirmation
			setPendingLevelChange(newLevel)
		} else {
			switchToNewLevel(newLevel)
		}
	}

	const switchToNewLevel = (newLevel: TestLevel) => {
		setCurrentLevel(newLevel)
		const testsForLevel = tests[newLevel]
		if (testsForLevel.length > 0) {
			const firstTest = testsForLevel[0]
			setCurrentTest(firstTest)
			setCode(firstTest.code)
			setAssertions(firstTest.assertions)
		} else {
			setCurrentTest(null)
			setCode('')
			setAssertions('')
		}
		setConsoleOutput('')
		setHasUnsavedChanges(false)
	}

	return (
		<div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
			<Header
				theme={theme}
				toggleTheme={toggleTheme}
				onResetTests={() => {
					setTests(DEFAULT_TESTS)
					const defaultTest = DEFAULT_TESTS[currentLevel][0]
					setCurrentTest(defaultTest)
					setCode(defaultTest.code)
					setAssertions(defaultTest.assertions)
				}}
				currentLevel={currentLevel}
				onLevelChange={handleLevelChange}
			/>

			<main>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
						<Select
							onValueChange={handleTestSelection}
							value={currentTest?.id}
						>
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="Select a test" />
							</SelectTrigger>
							<SelectContent>
								{tests[currentLevel] && tests[currentLevel].length > 0 ? (
									tests[currentLevel].map(test => (
										<SelectItem
											key={test.id}
											value={test.id}
										>
											{test.name}
										</SelectItem>
									))
								) : (
									<SelectItem value="no-tests">No tests available</SelectItem>
								)}
							</SelectContent>
						</Select>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={runCode}
										variant={theme === 'dark' ? 'ghost' : 'default'}
									>
										<Play
											className="h-4 w-4 mr-2"
											aria-hidden="true"
										/>
										Run Code
									</Button>
								</TooltipTrigger>

								<TooltipContent>
									<p>Run Code (⌘S or Ctrl+S)</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					<div
						className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end"
						role="toolbar"
						aria-label="Test management actions"
					>
						<Button
							variant={theme === 'dark' ? 'ghost' : 'default'}
							onClick={openNewTestDialog}
						>
							<Plus
								className="h-4 w-4 mr-2"
								aria-hidden="true"
							/>
							New Test
						</Button>

						<Button
							onClick={saveCurrentTest}
							disabled={!currentTest}
							variant={theme === 'dark' ? 'ghost' : 'default'}
						>
							<Save
								className="h-4 w-4 mr-2"
								aria-hidden="true"
							/>
							Save
						</Button>

						<Button
							onClick={openEditTestDialog}
							disabled={!currentTest}
							variant={theme === 'dark' ? 'ghost' : 'default'}
						>
							<Edit
								className="h-4 w-4 mr-2"
								aria-hidden="true"
							/>
							Edit
						</Button>

						<Button
							onClick={handleDeleteClick}
							disabled={!currentTest}
							variant="destructive"
						>
							<Trash
								className="h-4 w-4 mr-2"
								aria-hidden="true"
							/>
							Delete
						</Button>
					</div>
				</div>

				<div className={`grid ${isSmallScreen || maximizedEditor ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
					{(!maximizedEditor || maximizedEditor === 'code') && (
						<EditorSection
							title="Code Editor"
							value={code}
							onChange={handleCodeChange}
							onReset={resetEditor}
							maximizedEditor={maximizedEditor}
							editorType="code"
							toggleMaximizedEditor={toggleMaximizedEditor}
							editorTheme={editorTheme}
							editorRef={codeEditorRef}
							currentTest={currentTest as Test}
						/>
					)}

					{(!maximizedEditor || maximizedEditor === 'assertions') && (
						<EditorSection
							title="Assertions"
							value={assertions}
							onChange={handleAssertionsChange}
							onReset={() => setAssertions(currentTest?.assertions || '')}
							maximizedEditor={maximizedEditor}
							editorType="assertions"
							toggleMaximizedEditor={toggleMaximizedEditor}
							editorTheme={editorTheme}
							editorRef={assertionsEditorRef}
							currentTest={currentTest as Test}
						/>
					)}
				</div>

				<div className={`grid ${isSmallScreen ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mt-4`}>
					<section>
						<div className="flex justify-between items-center mb-2">
							<h2>Results</h2>
							<Button
								onClick={clearResults}
								variant="ghost"
								size="sm"
							>
								<X
									className="h-4 w-4 mr-1"
									aria-hidden="true"
								/>
								Clear
							</Button>
						</div>

						<div
							className={`p-2 h-[200px] overflow-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
							role="region"
							aria-label="Test results"
						>
							<pre>{results}</pre>
						</div>
					</section>

					<section>
						<div className="flex justify-between items-center mb-2">
							<h2>Console Output</h2>
							<Button
								onClick={clearConsoleOutput}
								variant="ghost"
								size="sm"
							>
								<X
									className="h-4 w-4 mr-1"
									aria-hidden="true"
								/>
								Clear
							</Button>
						</div>

						<div
							className={`p-2 h-[200px] overflow-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
							role="region"
							aria-label="Console output"
						>
							<pre>{consoleOutput}</pre>
						</div>
					</section>
				</div>
			</main>

			<TestNameDialog
				isOpen={dialogState.isOpen}
				onOpenChange={isOpen => setDialogState(prev => ({ ...prev, isOpen }))}
				title={dialogState.title}
				description={dialogState.description}
				inputValue={dialogState.inputValue}
				onInputChange={value => setDialogState(prev => ({ ...prev, inputValue: value }))}
				onKeyDown={handleDialogKeyDown}
				onSave={handleDialogSave}
				theme={theme}
			/>

			<ShortcutsDialog
				isOpen={isShortcutsDialogOpen}
				onOpenChange={setIsShortcutsDialogOpen}
				theme={theme}
			/>

			<DeleteConfirmationDialog
				isOpen={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onConfirm={confirmDelete}
				theme={theme}
			/>

			<SaveConfirmationDialog
				isOpen={isSaveDialogOpen}
				onOpenChange={setIsSaveDialogOpen}
				theme={theme}
				pendingTestSelection={pendingTestSelection}
				pendingLevelChange={pendingLevelChange}
				onSave={handleSaveConfirmation}
				onDontSave={handleDontSave}
			/>

			<Toaster />
		</div>
	)
}
