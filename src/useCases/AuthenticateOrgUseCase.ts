import type { Org } from '@prisma/client'
import type { OrgsRepository } from '@/repositories/OrgsRepository'
import { compare } from 'bcrypt'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

interface AuthenticateOrgUseCaseRequest {
	email: Org['email']
	password: Org['password']
}
interface AuthenticateOrgUseCaseResponse {
	org: Org
}

export class AuthenticateOrgUseCase {
	constructor(private orgsRepository: OrgsRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
		const org = await this.orgsRepository.findByEmail({ email })

		if (!org || !(await compare(password, org.password))) {
			throw new InvalidCredentialsError()
		}

		return { org }
	}
}
