import { InvalidCredentialsError } from '@/useCases/errors/InvalidCredentialsError'
import { makeAuthenticateOrgUseCase } from '@/useCases/factories/MakeAuthenticateOrgUseCase'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
	email: z.string(),
	password: z.string(),
})
export const authenticateOrgController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const body = bodySchema.parse(request.body)
	const authenticateOrgUseCase = makeAuthenticateOrgUseCase()
	try {
		const { org } = await authenticateOrgUseCase.execute(body)
		reply.status(200).send(org)
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message })
		}
		throw error
	}
}
