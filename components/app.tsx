'use client'

import React, { useState, useEffect, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { createTheme } from '@uiw/codemirror-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Moon, Sun, X, Plus, Save, Edit, Trash, Play, Undo } from 'lucide-react'
import { DEFAULT_TESTS } from './DEFAULT_TESTS'

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
	const [newTestName, setNewTestName] = useState('')
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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
			setTests(JSON.parse(savedTests))
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

	const createNewTest = () => {
		if (newTestName.trim()) {
			const newTest: Test = {
				id: Date.now().toString(),
				name: newTestName,
				code: '// Write your JavaScript code here',
				assertions: '// Write your assertions here',
			}
			setTests(prevTests => [...prevTests, newTest])
			setCurrentTest(newTest)
			setCode(newTest.code)
			setAssertions(newTest.assertions)
			setNewTestName('')
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

	const vscodeLightTheme = createTheme({
		theme: 'light',
		settings: {
			background: '#FFFFFF',
			foreground: '#000000',
			caret: '#000000',
			selection: '#ADD6FF',
			selectionMatch: '#ADD6FF',
			lineHighlight: '#F0F0F0',
			gutterBackground: '#FFFFFF',
			gutterForeground: '#919191',
		},
		styles: [
			{ tag: t.comment, color: '#008000' },
			{ tag: t.variableName, color: '#0070C1' },
			{ tag: [t.string, t.special(t.brace)], color: '#A31515' },
			{ tag: t.number, color: '#098658' },
			{ tag: t.bool, color: '#0000FF' },
			{ tag: t.null, color: '#0000FF' },
			{ tag: t.keyword, color: '#0000FF' },
			{ tag: t.operator, color: '#000000' },
			{ tag: t.className, color: '#267F99' },
			{ tag: t.definition(t.typeName), color: '#267F99' },
			{ tag: t.typeName, color: '#267F99' },
			{ tag: t.angleBracket, color: '#800000' },
			{ tag: t.tagName, color: '#800000' },
			{ tag: t.attributeName, color: '#FF0000' },
		],
	})

	const vscodeDarkTheme = createTheme({
		theme: 'dark',
		settings: {
			background: '#1E1E1E',
			foreground: '#D4D4D4',
			caret: '#FFFFFF',
			selection: '#264F78',
			selectionMatch: '#264F78',
			lineHighlight: '#2A2D2E',
			gutterBackground: '#1E1E1E',
			gutterForeground: '#858585',
		},
		styles: [
			{ tag: t.comment, color: '#6A9955' },
			{ tag: t.variableName, color: '#9CDCFE' },
			{ tag: [t.string, t.special(t.brace)], color: '#CE9178' },
			{ tag: t.number, color: '#B5CEA8' },
			{ tag: t.bool, color: '#569CD6' },
			{ tag: t.null, color: '#569CD6' },
			{ tag: t.keyword, color: '#569CD6' },
			{ tag: t.operator, color: '#D4D4D4' },
			{ tag: t.className, color: '#4EC9B0' },
			{ tag: t.definition(t.typeName), color: '#4EC9B0' },
			{ tag: t.typeName, color: '#4EC9B0' },
			{ tag: t.angleBracket, color: '#808080' },
			{ tag: t.tagName, color: '#569CD6' },
			{ tag: t.attributeName, color: '#9CDCFE' },
		],
	})

	const editorTheme = theme === 'dark' ? vscodeDarkTheme : vscodeLightTheme

	return (
		<div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">JavaScript Practice Platform</h1>
				<Button
					onClick={toggleTheme}
					variant={theme === 'dark' ? 'ghost' : 'default'}
					size="icon"
				>
					{theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
				</Button>
			</div>
			<div className="flex justify-between items-center mb-4">
				<Select onValueChange={selectTest}>
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
					<Dialog>
						<DialogTrigger asChild>
							<Button variant={theme === 'dark' ? 'ghost' : 'default'}>
								<Plus className="h-4 w-4 mr-2" />
								New Test
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New Test</DialogTitle>
								<DialogDescription>Enter a name for your new test.</DialogDescription>
							</DialogHeader>
							<Input
								value={newTestName}
								onChange={e => setNewTestName(e.target.value)}
								placeholder="Test name"
							/>
							<DialogFooter>
								<Button onClick={createNewTest}>Create</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Button
						onClick={saveCurrentTest}
						disabled={!currentTest}
						variant={theme === 'dark' ? 'ghost' : 'default'}
					>
						<Save className="h-4 w-4 mr-2" />
						Save
					</Button>
					<Button
						onClick={() => setIsEditDialogOpen(true)}
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
			<div className="grid grid-cols-2 gap-4">
				<div>
					<div className="flex justify-between items-center mb-2">
						<h2 className="mb-2">Code Editor</h2>

						<Button
							onClick={resetEditor}
							variant="ghost"
							size="sm"
							disabled={!currentTest}
						>
							<Undo className="h-4 w-4 mr-1" />
							Reset
						</Button>
					</div>

					<CodeMirror
						value={code}
						height="200px"
						extensions={[javascript({ jsx: true })]}
						onChange={value => setCode(value)}
						theme={editorTheme}
					/>
				</div>
				<div>
					<h2 className="mb-2">Assertions</h2>
					<CodeMirror
						value={assertions}
						height="200px"
						extensions={[javascript({ jsx: true })]}
						onChange={value => setAssertions(value)}
						theme={editorTheme}
					/>
				</div>
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
			<Button
				onClick={runCode}
				className="mt-4"
				variant={theme === 'dark' ? 'ghost' : 'default'}
			>
				<Play className="h-4 w-4 mr-2" />
				Run Code
			</Button>
			<Dialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Test</DialogTitle>
						<DialogDescription>Edit the name of your test.</DialogDescription>
					</DialogHeader>
					<Input
						value={currentTest?.name || ''}
						onChange={e => setCurrentTest(prev => (prev ? { ...prev, name: e.target.value } : null))}
						placeholder="Test name"
					/>
					<DialogFooter>
						<Button
							onClick={() => {
								if (currentTest) {
									const updatedTests = tests.map(test => (test.id === currentTest.id ? { ...currentTest } : test))
									setTests(updatedTests)
									setIsEditDialogOpen(false)
								}
							}}
						>
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
