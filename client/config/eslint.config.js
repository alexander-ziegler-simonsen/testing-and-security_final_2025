// eslint.config.js
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import svelteParser from 'svelte-eslint-parser';
import svelte from 'eslint-plugin-svelte';
import importPlugin from 'eslint-plugin-import';

export default [
	// JS baseline rules
	eslint.configs.recommended,

	// TypeScript rules
	{
		files: ['**/*.ts', '**/*.js'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest'
			}
		},
		plugins: { '@typescript-eslint': tseslint, import: importPlugin },
		rules: {
			...tseslint.configs.recommended.rules
		}
	},

	// Svelte files
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: {
					ts: tsparser
				}
			}
		},
		plugins: { svelte },
		rules: {
			...svelte.configs.recommended.rules
		}
	},

	// Import resolver (fix .svelte import errors)
	{
		settings: {
			ignorePatterns: ["node_modules", "dist", "build", ".vite"],
			'import/resolver': {
				typescript: {
					extensions: ['.ts', '.js', '.svelte']
				}
			}
		}
	}
	
];
