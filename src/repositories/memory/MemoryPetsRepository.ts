import type {
	FindAllParams,
	PetsRepository,
} from '@/repositories/PetsRepository'
import type { Prisma, Pet, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class MemoryPetsRepository implements PetsRepository {
	private pets: Pet[] = []
	private orgs: Org[] = []
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const newPet: Pet = { ...data, id: randomUUID() }
		this.pets.push(newPet)
		return newPet
	}
	async findById({ id }: Pick<Pet, 'id'>): Promise<Pet | null> {
		const pet = this.pets.find((pet) => pet.id === id)
		return pet || null
	}
	async findAll(params: FindAllParams): Promise<Pet[]> {
		const { city, age, breed, color, size } = params
		return this.pets
			.filter((pet) =>
				this.orgs.some(
					(org) => org.id === pet.ownerId && org.city === city,
				),
			)
			.filter((pet) => (age ? pet.age === age : true))
			.filter((pet) => (breed ? pet.breed === breed : true))
			.filter((pet) => (color ? pet.color === color : true))
			.filter((pet) => (size ? pet.size === size : true))
	}
}
