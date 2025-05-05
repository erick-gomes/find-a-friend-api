import { makeSearchPetsUseCase } from '@/useCases/factories/MakeSearchPetsUseCase'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
	city: z.string(),
	name: z.string().optional(),
	age: z.string().optional(),
	color: z.string().optional(),
	size: z.string().optional(),
	breed: z.string().optional(),
})

export const searchPetsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const query = querySchema.parse(request.query)
	const searchPetsUseCase = makeSearchPetsUseCase()

	try {
		const { pets } = await searchPetsUseCase.execute(query)
		reply.status(200).send({ pets })
	} catch (error) {
		console.error(error)
		throw error
	}
}
