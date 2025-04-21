import type { PetsRepository } from '@/repositories/PetsRepositoy'
import type { Pet } from '@prisma/client'

interface GetPetServiceRequest {
	id: Pet['id']
}

interface GetPetServiceResponse {
	pet: Pet
}

export class GetPetService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({ id }: GetPetServiceRequest): Promise<GetPetServiceResponse> {
		const pet = await this.petsRepository.findById(id)

		if (!pet) {
			throw new Error('Pet not found')
		}

		return { pet }
	}
}
