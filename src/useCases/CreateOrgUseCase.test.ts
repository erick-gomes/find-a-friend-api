import { MemoryOrgsRepository } from '@/repositories/memory/MemoryOrgsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './CreateOrgUseCase'
import { compare } from 'bcrypt'
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError'

describe('CreateOrg UseCase', () => {
	let orgsRepository: MemoryOrgsRepository
	let systemUnderTest: CreateOrgUseCase
	beforeEach(() => {
		orgsRepository = new MemoryOrgsRepository()
		systemUnderTest = new CreateOrgUseCase(orgsRepository)
	})
	it('should be able to create an organization', async () => {
		const password = 'securepassword'
		const orgData = {
			name: 'Pet Shelter',
			owner_name: 'John Doe',
			email: 'john.doe@example.com',
			password,
			phone: '123456789',
			state: 'CA',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			cep: '90001',
			address: '123 Main St',
		}
		const { org: createdOrg } = await systemUnderTest.execute(orgData)
		expect(orgsRepository.orgs).toHaveLength(1)
		expect(createdOrg.id).toEqual(expect.any(String))
	})

	it('should not be able to create an organization with existing email', async () => {
		const password = 'securepassword'
		const existingEmail = 'john.doe@example.com'
		await systemUnderTest.execute({
			name: 'Pet Shelter',
			owner_name: 'John Doe',
			email: existingEmail,
			password,
			phone: '123456789',
			state: 'CA',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			cep: '90001',
			address: '123 Main St',
		})
		await expect(
			systemUnderTest.execute({
				name: 'Another Shelter',
				owner_name: 'Jane Doe',
				email: existingEmail,
				password,
				phone: '987654321',
				state: 'CA',
				city: 'Los Angeles',
				neighborhood: 'Uptown',
				cep: '90002',
				address: '456 Elm St',
			}),
		).rejects.toBeInstanceOf(OrgAlreadyExistsError)
	})

	it('should hash the password upon creation', async () => {
		const password = 'securepassword'
		const { org: createdOrg } = await systemUnderTest.execute({
			name: 'Pet Shelter',
			owner_name: 'John Doe',
			email: 'john@example.com',
			password: 'securepassword',
			phone: '123456789',
			state: 'CA',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			cep: '90001',
			address: '123 Main St',
		})
		const isPasswordCorrectlyHashed = await compare(
			password,
			createdOrg.password,
		)
		expect(isPasswordCorrectlyHashed).toBe(true)
	})
})
