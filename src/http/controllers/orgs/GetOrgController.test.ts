import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Org E2E', () => {
    let orgId: string
    beforeAll(async () => {
        await app.ready()
        const res = await request(app.server).post('/orgs').send({
            name: 'Org Name',
            email: 'getorg@example.com',
            password: 'securepassword',
            owner_name: 'Owner Name',
            address: '123 Main St',
            phone: '123-456-7890',
            cep: '12345-678',
            city: 'City Name',
            neighborhood: 'Neighborhood Name',
            state: 'State Name',
        })
        orgId = res.body.id
    })
    afterAll(async () => {
        await app.close()
    })
    it('should get an org by id', async () => {
        const response = await request(app.server).get(`/orgs/${orgId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id', orgId)
    })
    it('should return 404 for non-existing org', async () => {
        const response = await request(app.server).get('/orgs/non-existing-id')
        expect(response.status).toBe(404)
    })
})
