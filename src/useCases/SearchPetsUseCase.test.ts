import { describe, beforeEach, it, expect } from 'vitest'
import { SearchPetsUseCase } from './SearchPetsUseCase'
import { MemoryPetsRepository } from '@/repositories/memory/MemoryPetsRepository'
import { MemoryOrgsRepository } from '@/repositories/memory/MemoryOrgsRepository'

describe('SearchPetsUseCase', () => {
	let petsRepository: MemoryPetsRepository
	let orgsRepository: MemoryOrgsRepository
	let systemUnderTest: SearchPetsUseCase
	beforeEach(() => {
		petsRepository = new MemoryPetsRepository()
		orgsRepository = new MemoryOrgsRepository()
		systemUnderTest = new SearchPetsUseCase(petsRepository)
	})

	it('should be able to search pets by characteristics', async () => {
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

		const pet = await petsRepository.create({
			ownerId: org.id,
			name: 'Buddy',
			description: 'A friendly golden retriever',
			age: 3,
			breed: 'Golden Retriever',
			color: 'Golden',
			size: 'Large',
		})

		await systemUnderTest.execute({
			city: 'Los Angeles',
			age: 3,
			breed: 'Golden Retriever',
			color: 'Golden',
			size: 'Large',
		})

		expect(petsRepository.pets).toContainEqual(pet)
	})
})
