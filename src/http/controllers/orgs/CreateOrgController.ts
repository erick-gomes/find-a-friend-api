import { OrgAlreadyExistsError } from '@/useCases/errors/OrgAlreadyExistsError'
import { makeCreateOrgUseCase } from '@/useCases/factories/MakeCreateOrgUseCase'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	owner_name: z.string(),
	address: z.string(),
	phone: z.string(),
	cep: z.string(),
	city: z.string(),
	neighborhood: z.string(),
	state: z.string(),
})

export const createOrgController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const body = bodySchema.parse(request.body)
	const createOrgUseCase = makeCreateOrgUseCase()

	try {
		const { org } = await createOrgUseCase.execute(body)
		reply.status(201).send(org)
	} catch (error) {
		if (error instanceof OrgAlreadyExistsError) {
			return reply.status(400).send({ message: error.message })
		}
		throw error
	}
}
