import type { OrgsRepository } from '@/repositories/OrgsRepository'
import { OrgAlreadyExistsError } from '@/useCases/errors/OrgAlreadyExistsError'
import type { Org, Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

interface CreateOrgServiceRequest
	extends Omit<Prisma.OrgUncheckedCreateInput, 'id' | 'pets'> {}
interface CreateOrgServiceResponse {
	org: Org
}

export class CreateOrgService {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		name,
		email,
		password,
		owner_name,
		address,
		phone,
		cep,
		city,
		neighborhood,
		state,
	}: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
		const orgExists = await this.orgsRepository.findByEmail({ email })

		if (orgExists) {
			throw new OrgAlreadyExistsError()
		}

		const password_hash = await hash(password, 8)

		const org = await this.orgsRepository.create({
			name,
			email,
			password: password_hash,
			owner_name,
			address,
			phone,
			cep,
			city,
			neighborhood,
			state,
		})

		return { org }
	}
}
