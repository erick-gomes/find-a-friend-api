import vitestConfig from './vitest.config'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
	vitestConfig,
	defineConfig({
		test: {
			exclude: [
				...configDefaults.exclude,
				'**/src/useCases/*.{test,spec}.ts',
			],
			environment: './src/utils/prisma-test-environment.ts',
		},
	}),
)
