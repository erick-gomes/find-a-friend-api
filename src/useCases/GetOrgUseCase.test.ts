import { MemoryOrgsRepository } from '@/repositories/memory/MemoryOrgsRepository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetOrgUseCase } from './GetOrgUseCase'
import { OrgNotFoundError } from './errors/OrgNotFoundError'

describe('GetOrg UseCase', () => {
	let orgsRepository: MemoryOrgsRepository
	let systemUnderTest: GetOrgUseCase

	beforeEach(() => {
		orgsRepository = new MemoryOrgsRepository()
		systemUnderTest = new GetOrgUseCase(orgsRepository)
	})

	it('should be able to get an organization by ID', async () => {
		const org = await orgsRepository.create({
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

		const { org: fetchedOrg } = await systemUnderTest.execute({
			id: org.id,
		})

		expect(fetchedOrg).toEqual(org)
	})

	it('should not be able to get an organization with non-existing ID', async () => {
		await expect(() =>
			systemUnderTest.execute({
				id: 'non-existing-id',
			}),
		).rejects.toBeInstanceOf(OrgNotFoundError)
	})
})
