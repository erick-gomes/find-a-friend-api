import type { PetsRepository } from '@/repositories/PetsRepository'
import type { Org, Pet, Prisma } from '@prisma/client'

interface SearchPetsServiceRequest
	extends Omit<
		Prisma.PetUncheckedCreateInput,
		'id' | 'ownerId' | 'name' | 'description'
	> {
	city: Org['city']
}

interface SearchPetsServiceResponse {
	pets: Pet[]
}

export class SearchPetsService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		city,
		age,
		breed,
		color,
		size,
	}: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
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
