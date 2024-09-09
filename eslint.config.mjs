import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.recommended,
	pluginReactHooks.configs.recommended,
	pluginJsxA11y.configs.recommended,
	nextPlugin.configs.recommended,
	{
		rules: {
			'react/react-in-jsx-scope': 'off', // Not needed in Next.js
			'react/prop-types': 'off', // If using TypeScript
		},
	},
]
