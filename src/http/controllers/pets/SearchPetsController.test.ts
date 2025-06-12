import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets E2E', () => {
    let orgId: string
    beforeAll(async () => {
        await app.ready()
        const orgRes = await request(app.server).post('/orgs').send({
            name: 'Pet Org',
            email: 'searchpetorg@example.com',
            password: 'securepassword',
            owner_name: 'Owner Name',
            address: '123 Main St',
            phone: '123-456-7890',
            cep: '12345-678',
            city: 'Pet City',
            neighborhood: 'Neighborhood',
            state: 'State',
        })
        orgId = orgRes.body.id
        await request(app.server).post('/pets').send({
            name: 'Buddy',
            description: 'A friendly dog',
            age: '3',
            breed: 'Labrador',
            color: 'Yellow',
            size: 'Medium',
            ownerId: orgId,
        })
        await request(app.server).post('/pets').send({
            name: 'Max',
            description: 'A playful dog',
            age: '2',
            breed: 'Poodle',
            color: 'White',
            size: 'Small',
            ownerId: orgId,
        })
    })
    afterAll(async () => {
        await app.close()
    })
    it('should search pets by city', async () => {
        const response = await request(app.server).get('/pets').query({ city: 'Pet City' })
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.pets)).toBe(true)
        expect(response.body.pets.length).toBeGreaterThanOrEqual(2)
    })
})
