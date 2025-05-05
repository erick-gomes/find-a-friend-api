import { PetNotFoundError } from '@/useCases/errors/PetNotFoundError'
import { makeGetPetUseCase } from '@/useCases/factories/MakeGetPetUseCase'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
	id: z.string(),
})

export const getPetController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const body = paramsSchema.parse(request.params)
	const getPetUseCase = makeGetPetUseCase()

	try {
		const { pet } = await getPetUseCase.execute(body)
		reply.status(200).send(pet)
	} catch (error) {
		if (error instanceof PetNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
