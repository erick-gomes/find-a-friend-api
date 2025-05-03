import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import { makeGetOrgUseCase } from '@/useCases/factories/MakeGetOrgUseCase'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
	id: z.string(),
})

export const getOrg = async (request: FastifyRequest, reply: FastifyReply) => {
	const body = bodySchema.parse(request.body)
	const getOrgUseCase = makeGetOrgUseCase()

	try {
		const { org } = await getOrgUseCase.execute(body)
		reply.status(200).send(org)
	} catch (error) {
		if (error instanceof OrgNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
