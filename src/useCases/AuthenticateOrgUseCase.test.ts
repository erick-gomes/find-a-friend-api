import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryOrgsRepository } from '@/repositories/memory/MemoryOrgsRepository'
import { AuthenticateOrgUseCase } from '@/useCases/AuthenticateOrgUseCase'
import { InvalidCredentialsError } from '@/useCases/errors/InvalidCredentialsError'
import { hash } from 'bcrypt'

describe('AuthenticateOrg UseCase', () => {
	let orgsRepository: MemoryOrgsRepository
	let systemUnderTest: AuthenticateOrgUseCase
	beforeEach(() => {
		orgsRepository = new MemoryOrgsRepository()
		systemUnderTest = new AuthenticateOrgUseCase(orgsRepository)
	})
	it('should be able to authenticate an organization', async () => {
		const password = '12345678'
		const org = await orgsRepository.create({
			name: 'Pet Shelter',
			owner_name: 'John Doe',
			email: 'john.doe@example.com',
			password: await hash(password, 8),
			phone: '123456789',
			state: 'CA',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			cep: '90001',
			address: '123 Main St',
		})

		const { org: authenticatedOrg } = await systemUnderTest.execute({
			email: org.email,
			password: password,
		})

		expect(authenticatedOrg).toEqual(org)
	})
	it('should not be able to authenticate an organization with wrong email', async () => {
		await expect(() =>
			systemUnderTest.execute({
				email: 'wrong.email@example.com',
				password: '12345678',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
	it('should not be able to authenticate an organization with wrong password', async () => {
		await expect(() =>
			systemUnderTest.execute({
				email: 'john.doe@example.com',
				password: 'wrongpassword',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
