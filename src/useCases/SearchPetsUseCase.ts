import type { PetsRepository } from '@/repositories/PetsRepository'
import type { Org, Pet, Prisma } from '@prisma/client'

interface SearchPetsUseCaseRequest
	extends Omit<
		Prisma.PetUncheckedCreateInput,
		'id' | 'ownerId' | 'name' | 'description'
	> {
	city: Org['city']
}

interface SearchPetsUseCaseResponse {
	pets: Pet[]
}

export class SearchPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		city,
		age,
		breed,
		color,
		size,
	}: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
		const pets = await this.petsRepository.findAll({
			city,
			age,
			breed,
			color,
			size,
		})

		return { pets }
	}
}
