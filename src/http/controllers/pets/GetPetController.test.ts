import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet E2E', () => {
    let orgId: string
    let petId: string
    beforeAll(async () => {
        await app.ready()
        const orgRes = await request(app.server).post('/orgs').send({
            name: 'Pet Org',
            email: 'getpetorg@example.com',
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
        const petRes = await request(app.server).post('/pets').send({
            name: 'Buddy',
            description: 'A friendly dog',
            age: '3',
            breed: 'Labrador',
            color: 'Yellow',
            size: 'Medium',
            ownerId: orgId,
        })
        petId = petRes.body.id
    })
    afterAll(async () => {
        await app.close()
    })
    it('should get a pet by id', async () => {
        const response = await request(app.server).get(`/pets/${petId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id', petId)
    })
    it('should return 404 for non-existing pet', async () => {
        const response = await request(app.server).get('/pets/non-existing-id')
        expect(response.status).toBe(404)
    })
})
