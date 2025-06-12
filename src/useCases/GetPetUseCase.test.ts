import { MemoryPetsRepository } from '@/repositories/memory/MemoryPetsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './GetPetUseCase'
import { MemoryOrgsRepository } from '@/repositories/memory/MemoryOrgsRepository'
import { PetNotFoundError } from './errors/PetNotFoundError'

describe('GetPet UseCase', () => {
	let petsRepository: MemoryPetsRepository
	let orgsRepository: MemoryOrgsRepository
	let systemUnderTest: GetPetUseCase
	beforeEach(() => {
		petsRepository = new MemoryPetsRepository()
		orgsRepository = new MemoryOrgsRepository()
		systemUnderTest = new GetPetUseCase(petsRepository)
	})
	it('should be able to get a pet by ID', async () => {
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
			name: 'Fido',
			description: 'A friendly dog',
			age: 3,
			breed: 'Labrador',
			color: 'Yellow',
			size: 'Medium',
		})
		const { pet: fetchedPet } = await systemUnderTest.execute({
			id: pet.id,
		})
		expect(fetchedPet).toEqual(pet)
	})
	it('should not be able to get a pet with a non-existent ID', async () => {
		await expect(
			systemUnderTest.execute({ id: 'non-existent-id' }),
		).rejects.toBeInstanceOf(PetNotFoundError)
	})
})
