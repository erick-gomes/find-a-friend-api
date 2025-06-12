import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import { makeGetOrgUseCase } from '@/useCases/factories/MakeGetOrgUseCase'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
	id: z.string(),
})

export const getOrgController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const params = paramsSchema.parse(request.params)
	const getOrgUseCase = makeGetOrgUseCase()

	try {
		const { org } = await getOrgUseCase.execute(params)
		reply.status(200).send(org)
	} catch (error) {
		if (error instanceof OrgNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
