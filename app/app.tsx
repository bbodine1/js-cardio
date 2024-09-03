'use client'

import React, { useState, useEffect, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Moon, Sun, X, Plus, Save, Edit, Trash, Play, Undo, Maximize2, Minimize2 } from 'lucide-react'
import { vscodeLightTheme, vscodeDarkTheme } from '@/app/cm-themes'
import { DEFAULT_TESTS } from '../components/DEFAULT_TESTS'

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
	const [theme, setTheme] = useState('light')
	const [currentTest, setCurrentTest] = useState<Test | null>(null)
	const [dialogState, setDialogState] = useState<{
		isOpen: boolean
		type: 'new' | 'edit'
		title: string
		description: string
		inputValue: string
		onSave: () => void
	}>({
		isOpen: false,
		type: 'new',
		title: '',
		description: '',
		inputValue: '',
		onSave: () => {},
	})

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
		setTheme(prefersDark ? 'dark' : 'light')
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
	}, [])

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
		} catch (error: any) {
			if (error.message.startsWith('Assertion failed')) {
				assertionResults.push(`❌ Assertion ${assertionCount} failed: ${error.message}`)
			} else {
				assertionResults.push(`❌ Error: ${error.message}`)
			}
			setResults(assertionResults.join('\n'))
		} finally {
			console.log = originalLog
			setConsoleOutput(output)
		}
	}, [code, assertions])

	useEffect(() => {
		const handleKeyDown = (event: { metaKey: any; ctrlKey: any; key: string; preventDefault: () => void }) => {
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

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	const clearResults = () => {
		setResults('')
	}

	const clearConsoleOutput = () => {
		setConsoleOutput('')
	}

	const openNewTestDialog = () => {
		setDialogState({
			isOpen: true,
			type: 'new',
			title: 'Create New Test',
			description: 'Enter a name for your new test.',
			inputValue: '',
			onSave: () => {
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
				}
			},
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
				onSave: () => {
					const updatedTests = tests.map(test =>
						test.id === currentTest.id ? { ...currentTest, name: dialogState.inputValue } : test
					)
					setTests(updatedTests)
					setCurrentTest(prev => prev ? { ...prev, name: dialogState.inputValue } : null)
					setDialogState(prev => ({ ...prev, isOpen: false }))
				},
			})
		}
	}

	const saveCurrentTest = () => {
		if (currentTest) {
			setTests(prevTests => prevTests.map(test => (test.id === currentTest.id ? { ...test, code, assertions } : test)))
			setCurrentTest({ ...currentTest, code, assertions })
		}
	}

	const deleteCurrentTest = () => {
		if (currentTest) {
			setTests(prevTests => prevTests.filter(test => test.id !== currentTest.id))
			setCurrentTest(null)
			setCode('// Write your JavaScript code here')
			setAssertions('// Write your assertions here')
		}
	}

	const resetEditor = useCallback(() => {
		if (currentTest) {
			setCode(currentTest.code)
			setAssertions(currentTest.assertions)
		}
	}, [currentTest])

	const selectTest = (testId: string) => {
		const selected = tests.find(test => test.id === testId)
		if (selected) {
			setCurrentTest(selected)
			setCode(selected.code)
			setAssertions(selected.assertions)
		}
	}

	const editorTheme = theme === 'dark' ? vscodeDarkTheme : vscodeLightTheme

	const [maximizedEditor, setMaximizedEditor] = useState<'code' | 'assertions' | null>(null);

	const toggleMaximizedEditor = (editor: 'code' | 'assertions') => {
		setMaximizedEditor(prev => prev === editor ? null : editor);
	};

	return (
		<div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">JavaScript Cardio</h1>

				<Button
					onClick={toggleTheme}
					variant={theme === 'dark' ? 'ghost' : 'default'}
					size="icon"
				>
					{theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
				</Button>
			</div>

			<div className="flex justify-between items-center mb-4">
				<Select
					onValueChange={selectTest}
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

				<div className="flex gap-2">
					<Button 
						variant={theme === 'dark' ? 'ghost' : 'default'} 
						onClick={openNewTestDialog}
					>
						<Plus className="h-4 w-4 mr-2" />
						New Test
					</Button>
					<Button
						onClick={saveCurrentTest}
						disabled={!currentTest}
						variant={theme === 'dark' ? 'ghost' : 'default'}
					>
						<Save className="h-4 w-4 mr-2" />
						Save
					</Button>
					<Button
						onClick={openEditTestDialog}
						disabled={!currentTest}
						variant={theme === 'dark' ? 'ghost' : 'default'}
					>
						<Edit className="h-4 w-4 mr-2" />
						Edit
					</Button>
					<Button
						onClick={deleteCurrentTest}
						disabled={!currentTest}
						variant="destructive"
					>
						<Trash className="h-4 w-4 mr-2" />
						Delete
					</Button>
				</div>
			</div>

			<div className={`grid ${maximizedEditor ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
				{(!maximizedEditor || maximizedEditor === 'code') && (
					<div className={maximizedEditor === 'code' ? 'col-span-2' : ''}>
						<div className="flex justify-between items-center mb-2">
							<h2 className="mb-2">Code Editor</h2>
							<div className="flex gap-2">
								<Button
									onClick={resetEditor}
									variant="ghost"
									size="sm"
									disabled={!currentTest}
								>
									<Undo className="h-4 w-4 mr-1" />
									Reset
								</Button>
								<Button
									onClick={() => toggleMaximizedEditor('code')}
									variant="ghost"
									size="sm"
								>
									{maximizedEditor === 'code' ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
								</Button>
							</div>
						</div>
						<CodeMirror
							value={code}
							height={maximizedEditor === 'code' ? 'calc(100vh - 400px)' : '200px'}
							extensions={[javascript({ jsx: true })]}
							onChange={value => setCode(value)}
							theme={editorTheme}
						/>
					</div>
				)}

				{(!maximizedEditor || maximizedEditor === 'assertions') && (
					<div className={maximizedEditor === 'assertions' ? 'col-span-2' : ''}>
						<div className="flex justify-between items-center mb-2">
							<h2 className="mb-2">Assertions</h2>
							<div className="flex gap-2">
								<Button
									onClick={() => setAssertions(currentTest?.assertions || '')}
									variant="ghost"
									size="sm"
									disabled={!currentTest}
								>
									<Undo className="h-4 w-4 mr-1" />
									Reset
								</Button>
								<Button
									onClick={() => toggleMaximizedEditor('assertions')}
									variant="ghost"
									size="sm"
								>
									{maximizedEditor === 'assertions' ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
								</Button>
							</div>
						</div>
						<CodeMirror
							value={assertions}
							height={maximizedEditor === 'assertions' ? 'calc(100vh - 400px)' : '200px'}
							extensions={[javascript({ jsx: true })]}
							onChange={value => setAssertions(value)}
							theme={editorTheme}
						/>
					</div>
				)}

				{/* Results and Console Output sections */}
				<div className={maximizedEditor ? 'col-span-2 grid grid-cols-2 gap-4' : 'col-span-2 grid grid-cols-2 gap-4'}>
					<div>
						<div className="flex justify-between items-center mb-2">
							<h2>Results</h2>
							<Button
								onClick={clearResults}
								variant="ghost"
								size="sm"
							>
								<X className="h-4 w-4 mr-1" />
								Clear
							</Button>
						</div>
						<div className={`p-2 h-[200px] overflow-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
							<pre>{results}</pre>
						</div>
					</div>

					<div>
						<div className="flex justify-between items-center mb-2">
							<h2>Console Output</h2>
							<Button
								onClick={clearConsoleOutput}
								variant="ghost"
								size="sm"
							>
								<X className="h-4 w-4 mr-1" />
								Clear
							</Button>
						</div>
						<div className={`p-2 h-[200px] overflow-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
							<pre>{consoleOutput}</pre>
						</div>
					</div>
				</div>
			</div>

			<Button
				onClick={runCode}
				className="mt-4"
				variant={theme === 'dark' ? 'ghost' : 'default'}
			>
				<Play className="h-4 w-4 mr-2" />
				Run Code
			</Button>

			<Dialog open={dialogState.isOpen} onOpenChange={(isOpen) => setDialogState(prev => ({ ...prev, isOpen }))}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{dialogState.title}</DialogTitle>
						<DialogDescription>{dialogState.description}</DialogDescription>
					</DialogHeader>

					<Input
						value={dialogState.inputValue}
						onChange={(e) => setDialogState(prev => ({ ...prev, inputValue: e.target.value }))}
						placeholder="Test name"
					/>

					<DialogFooter>
						<Button onClick={dialogState.onSave}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
