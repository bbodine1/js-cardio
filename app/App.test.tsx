import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from './app'
import '@testing-library/jest-dom'

// Add this mock before the tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
})

describe('App', () => {
	it('renders the main title', () => {
		render(<App />)
		expect(screen.getByText('JavaScript Cardio')).toBeInTheDocument()
	})

	it('toggles theme when theme button is clicked', () => {
		render(<App />)
		const themeButton = screen.getByTestId('theme-toggle-btn')

		// Check initial theme (assuming it starts in light mode)
		expect(document.documentElement).toHaveAttribute('data-theme', 'light')

		// Verify initial button accessibility
		expect(themeButton).toHaveAttribute('aria-label', expect.stringMatching(/^Switch to (dark|light) theme$/))

		// Toggle to dark theme
		fireEvent.click(themeButton)
		expect(document.documentElement).toHaveAttribute('data-theme', 'dark')

		// Verify button accessibility after toggle
		expect(themeButton).toHaveAttribute('aria-label', expect.stringMatching(/^Switch to (dark|light) theme$/))

		// Toggle back to light theme
		fireEvent.click(themeButton)
		expect(document.documentElement).toHaveAttribute('data-theme', 'light')

		// Verify button accessibility after toggle back
		expect(themeButton).toHaveAttribute('aria-label', expect.stringMatching(/^Switch to (dark|light) theme$/))
	})

	it('opens new test dialog when "New Test" button is clicked', () => {
		render(<App />)
		const newTestButton = screen.getByRole('button', { name: /new test/i })

		fireEvent.click(newTestButton)
		expect(screen.getByText('Create New Test')).toBeInTheDocument()
	})

	it('runs code when "Run Code" button is clicked', () => {
		render(<App />)
		const runCodeButton = screen.getByRole('button', { name: /run code/i })

		fireEvent.click(runCodeButton)
		expect(screen.getByText(/assertion/i)).toBeInTheDocument()
	})
})
