import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Create Org E2E', () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})
	it('should be able to create an org', async () => {
		const response = await request(app.server).post('/orgs').send({
			name: 'Org Name',
			email: 'org@example.com',
			password: 'securepassword',
			owner_name: 'Owner Name',
			address: '123 Main St',
			phone: '123-456-7890',
			cep: '12345-678',
			city: 'City Name',
			neighborhood: 'Neighborhood Name',
			state: 'State Name',
		})
		expect(response.status).toBe(201)
	})
})
