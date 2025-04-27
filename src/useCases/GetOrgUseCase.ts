import type { OrgsRepository } from '@/repositories/OrgsRepository'
import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import type { Org } from '@prisma/client'

interface GetOrgUseCaseRequest {
	id: Org['id']
}

interface GetOrgUseCaseResponse {
	org: Org
}

export class GetOrgUseCase {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		id,
	}: GetOrgUseCaseRequest): Promise<GetOrgUseCaseResponse> {
		const org = await this.orgsRepository.findById({ id })

		if (!org) {
			throw new OrgNotFoundError()
		}

		return { org }
	}
}
