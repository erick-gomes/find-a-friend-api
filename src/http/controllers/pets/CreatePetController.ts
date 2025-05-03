import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import { makeCreatePetUseCase } from '@/useCases/factories/MakeCreatePetUseCase'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
	name: z.string(),
	description: z.string(),
	age: z.string(),
	breed: z.string(),
	color: z.string(),
	size: z.string(),
	ownerId: z.string(),
})

export const createPet = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const body = bodySchema.parse(request.body)
	const createPetUseCase = makeCreatePetUseCase()

	try {
		const { pet } = await createPetUseCase.execute(body)
		reply.status(201).send(pet)
	} catch (error) {
		if (error instanceof OrgNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
