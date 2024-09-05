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

type Test = {
	id: string
	name: string
	code: string
	assertions: string
}

const lsKey = 'jsTests'

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

	const [tests, setTests] = useState<Test[]>(() => {
		if (typeof window !== 'undefined') {
			const savedTests = localStorage.getItem(lsKey)
			if (savedTests) {
				try {
					return JSON.parse(savedTests)
				} catch (error) {
					console.error('Error parsing saved tests:', error)
				}
			} else {
				// If no saved tests, set the default tests
				localStorage.setItem(lsKey, JSON.stringify(DEFAULT_TESTS))
				return DEFAULT_TESTS
			}
		}
		return []
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
		const savedTests = localStorage.getItem(lsKey)
		if (savedTests) {
			const parsedTests = JSON.parse(savedTests)
			setTests(parsedTests)
			// Set the first test as the active test
			if (parsedTests.length > 0) {
				const firstTest = parsedTests[0]
				setCurrentTest(firstTest)
				setCode(firstTest.code)
				setAssertions(firstTest.assertions)
			}
		}
	}, [setTheme])

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
		// eslint-disable-next-line prefer-const
		let assertionCount = 0

		try {
			// Combine code and assertions
			const combinedCode = `
        ${code}
        
        function assert(condition, message = 'No message provided') {
          assertionCount++;
          if (!condition) {
            throw new Error(message);
          }
          assertionResults.push(\`✅ Assertion \${assertionCount} passed: \${message}\`);
        }
  
        ${assertions}
      `
			// Run combined code
			eval(combinedCode)

			// If no assertions were run, add a message
			if (assertionCount === 0) {
				assertionResults.push('⚠️ No assertions were found or executed.')
			} else {
				assertionResults.push(`\n✅ All ${assertionCount} assertion(s) passed.`)
			}

			setResults(assertionResults.join('\n'))
		} catch (error: unknown) {
			if (error instanceof Error && error.message.startsWith('Assertion failed')) {
				assertionResults.push(`❌ Assertion ${assertionCount} failed: ${error.message}`)
			} else if (error instanceof Error) {
				assertionResults.push(`❌ Error: ${error.message}`)
			} else {
				assertionResults.push(`❌ Unknown error occurred`)
			}
			setResults(assertionResults.join('\n'))
		} finally {
			console.log = originalLog
			setConsoleOutput(output)
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
				setTests(prevTests => [...prevTests, newTest])
				setCurrentTest(newTest)
				setCode(newTest.code)
				setAssertions(newTest.assertions)
				setDialogState(prev => ({ ...prev, isOpen: false }))
				setHasUnsavedChanges(false)
			}
		} else if (dialogState.type === 'edit' && currentTest) {
			const updatedTests = tests.map(test =>
				test.id === currentTest.id ? { ...currentTest, name: dialogState.inputValue } : test
			)
			setTests(updatedTests)
			setCurrentTest(prev => (prev ? { ...prev, name: dialogState.inputValue } : null))
			setDialogState(prev => ({ ...prev, isOpen: false }))
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
			setTests(prevTests => prevTests.map(test => (test.id === currentTest.id ? { ...test, code, assertions } : test)))
			setCurrentTest({ ...currentTest, code, assertions })
			setHasUnsavedChanges(false)
		}
	}

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true)
	}

	const confirmDelete = () => {
		if (currentTest) {
			setTests(prevTests => {
				const updatedTests = prevTests.filter(test => test.id !== currentTest.id)

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
					setTests([defaultTest])
					setCurrentTest(defaultTest)
					setCode(defaultTest.code)
					setAssertions(defaultTest.assertions)
				}

				setHasUnsavedChanges(false)
				return updatedTests
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
		const selected = tests.find(test => test.id === testId)
		if (selected) {
			setCurrentTest(selected)
			setCode(selected.code)
			setAssertions(selected.assertions)
			setHasUnsavedChanges(false)
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
			if (event.metaKey || event.ctrlKey) {
				if (event.key === 'm') {
					event.preventDefault()
					const activeElement = document.activeElement
					if (codeEditorRef.current?.contains(activeElement)) {
						toggleMaximizedEditor('code')
					} else if (assertionsEditorRef.current?.contains(activeElement)) {
						toggleMaximizedEditor('assertions')
					}
				} else if (event.key === '/') {
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
		}
	}

	const handleDontSave = () => {
		setIsSaveDialogOpen(false)
		if (pendingTestSelection === 'new') {
			openNewTestDialogDirectly()
		} else if (pendingTestSelection) {
			selectTest(pendingTestSelection)
		}
	}

	const handleCodeChange = (value: string) => {
		setCode(value)
		setHasUnsavedChanges(true)
	}

	const handleAssertionsChange = (value: string) => {
		setAssertions(value)
		setHasUnsavedChanges(true)
	}

	const focusCodeEditor = useCallback(() => {
		const codeContent = codeEditorRef.current?.querySelector('.cm-content') as HTMLElement
		codeContent?.focus()
	}, [])

	const focusAssertionsEditor = useCallback(() => {
		const assertionsContent = assertionsEditorRef.current?.querySelector('.cm-content') as HTMLElement
		assertionsContent?.focus()
	}, [])

	return (
		<div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
			<Header
				theme={theme}
				toggleTheme={toggleTheme}
			/>

			<main>
				<div className="flex justify-between items-center mb-4">
					<Select
						onValueChange={handleTestSelection}
						value={currentTest?.id}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select a test" />
						</SelectTrigger>
						<SelectContent>
							{tests.map(test => (
								<SelectItem
									key={test.id}
									value={test.id}
								>
									{test.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<div
						className="flex gap-2"
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

				<div className={`grid ${maximizedEditor ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
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
							currentTest={currentTest}
							onFocus={focusCodeEditor}
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
							currentTest={currentTest}
							onFocus={focusAssertionsEditor}
						/>
					)}

					<div className={maximizedEditor ? 'col-span-2 grid grid-cols-2 gap-4' : 'col-span-2 grid grid-cols-2 gap-4'}>
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
				</div>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								onClick={runCode}
								className="mt-4"
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
				onSave={handleSaveConfirmation}
				onDontSave={handleDontSave}
			/>
		</div>
	)
}
