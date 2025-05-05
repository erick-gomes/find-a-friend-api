import type { FastifyInstance } from 'fastify'
import { createPetController } from './CreatePetController'
import { getPetController } from './GetPetController'
import { searchPetsController } from './SearchPetsController'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets/:id', getPetController)
	app.get('/pets', searchPetsController)
	app.post('/pets', createPetController)
}
