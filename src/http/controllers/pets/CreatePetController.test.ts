import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet E2E', () => {
    let orgId: string
    beforeAll(async () => {
        await app.ready()
        const res = await request(app.server).post('/orgs').send({
            name: 'Pet Org',
            email: 'petorg@example.com',
            password: 'securepassword',
            owner_name: 'Owner Name',
            address: '123 Main St',
            phone: '123-456-7890',
            cep: '12345-678',
            city: 'Pet City',
            neighborhood: 'Neighborhood',
            state: 'State',
        })
        orgId = res.body.id
    })
    afterAll(async () => {
        await app.close()
    })
    it('should create a pet', async () => {
        const response = await request(app.server).post('/pets').send({
            name: 'Buddy',
            description: 'A friendly dog',
            age: '3',
            breed: 'Labrador',
            color: 'Yellow',
            size: 'Medium',
            ownerId: orgId,
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })
    it('should return 404 for non-existing org', async () => {
        const response = await request(app.server).post('/pets').send({
            name: 'Buddy',
            description: 'A friendly dog',
            age: '3',
            breed: 'Labrador',
            color: 'Yellow',
            size: 'Medium',
            ownerId: 'non-existing-org-id',
        })
        expect(response.status).toBe(404)
    })
})
