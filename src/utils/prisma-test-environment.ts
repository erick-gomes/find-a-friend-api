import type { Environment } from 'vitest/environments'
import { randomUUID } from 'node:crypto'
import { URL } from 'node:url'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
	if (!process.env.DB_URL) {
		throw new Error('DB_URL não está definido')
	}
	const url = new URL(process.env.DB_URL)
	url.searchParams.set('schema', schema)
	return url.toString()
}

export default (<Environment>{
	name: 'prisma-test-environment',
	transformMode: 'ssr',
	async setup() {
		const schema = `test-${randomUUID()}`
		const databaseUrl = generateDatabaseUrl(schema)
		process.env.DB_URL = databaseUrl
		execSync('npx prisma migrate deploy')
		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				)
				await prisma.$disconnect()
			},
		}
	},
})
