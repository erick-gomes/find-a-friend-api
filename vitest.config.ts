import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    workspace: [
      {
        extends: true,
        test: {
          name: 'e2e',
          environment: 'prisma',
          include: ['./src/http/controllers/**'],
        },
      },
    ],
  },
})
