import { beforeEach, describe, it, expect } from 'vitest'

import { MemoryPetsRepository } from '@/repositories/memory/MemoryPetsRepository'
import { CreatePetUseCase } from './CreatePetUseCase'
import { MemoryOrgsRepository } from '@/repositories/memory/MemoryOrgsRepository'
import { OrgNotFoundError } from './errors/OrgNotFoundError'

describe('CreatePet UseCase', () => {
	let petsRepository: MemoryPetsRepository
	let orgsRepository: MemoryOrgsRepository
	let systemUnderTest: CreatePetUseCase
	beforeEach(() => {
		petsRepository = new MemoryPetsRepository()
		orgsRepository = new MemoryOrgsRepository()
		systemUnderTest = new CreatePetUseCase(petsRepository, orgsRepository)
	})

	it('should be able to create a pet', async () => {
		const org = await orgsRepository.create({
			name: 'Pet Shelter',
			owner_name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'securepassword',
			phone: '123456789',
			state: 'CA',
			city: 'Los Angeles',
			neighborhood: 'Downtown',
			cep: '90001',
			address: '123 Main St',
		})

		const { pet } = await systemUnderTest.execute({
			name: 'Buddy',
			age: 3,
			breed: 'Golden Retriever',
			ownerId: org.id,
			description: 'A friendly golden retriever',
			color: 'Golden',
			size: 'Large',
		})

		expect(petsRepository.pets).toHaveLength(1)
		expect(pet.id).toEqual(expect.any(String))
	})

	it('should not be able to create a pet with non-existing org', async () => {
		await expect(
			systemUnderTest.execute({
				name: 'Buddy',
				age: 3,
				breed: 'Golden Retriever',
				ownerId: 'non-existing-org-id',
				description: 'A friendly golden retriever',
				color: 'Golden',
				size: 'Large',
			}),
		).rejects.toBeInstanceOf(OrgNotFoundError)
	})
})
