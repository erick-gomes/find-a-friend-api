import type { Org } from '@prisma/client'
import type { OrgsRepository } from '@/repositories/OrgsRepository'
import { compare } from 'bcrypt'

interface AuthenticateOrgServiceRequest {
	email: Org['email']
	password: Org['password']
}
interface AuthenticateOrgServiceResponse {
	org: Org
}

export class AuthenticateOrgService {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
		const org = await this.orgsRepository.findByEmail({ email })

		if (!org || !(await compare(password, org.password))) {
			throw new Error('Invalid credentials')
		}

		return { org }
	}
}
