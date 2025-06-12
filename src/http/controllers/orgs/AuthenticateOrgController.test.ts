import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Org E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should authenticate an org with correct credentials', async () => {
        await request(app.server).post('/orgs').send({
            name: 'Org Name',
            email: 'auth@example.com',
            password: 'securepassword',
            owner_name: 'Owner Name',
            address: '123 Main St',
            phone: '123-456-7890',
            cep: '12345-678',
            city: 'City Name',
            neighborhood: 'Neighborhood Name',
            state: 'State Name',
        })
        const response = await request(app.server).post('/orgs/authenticate').send({
            email: 'auth@example.com',
            password: 'securepassword',
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
    })
    it('should not authenticate with wrong password', async () => {
        const response = await request(app.server).post('/orgs/authenticate').send({
            email: 'auth@example.com',
            password: 'wrongpassword',
        })
        expect(response.status).toBe(400)
    })
})
