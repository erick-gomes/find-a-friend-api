import type { OrgsRepository } from '@/repositories/OrgsRepository'
import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import type { Org } from '@prisma/client'

interface GetOrgServiceRequest {
	id: Org['id']
}

interface GetOrgServiceResponse {
	org: Org
}

export class GetOrgService {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		id,
	}: GetOrgServiceRequest): Promise<GetOrgServiceResponse> {
		const org = await this.orgsRepository.findById({ id })

		if (!org) {
			throw new OrgNotFoundError()
		}

		return { org }
	}
}
