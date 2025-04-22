import type { PetsRepository } from '@/repositories/PetsRepositoy'
import type { Pet } from '@prisma/client'
import { PetNotFoundError } from '@/services/errors/PetNotFoundError'

interface GetPetServiceRequest {
	id: Pet['id']
}

interface GetPetServiceResponse {
	pet: Pet
}

export class GetPetService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		id,
	}: GetPetServiceRequest): Promise<GetPetServiceResponse> {
		const pet = await this.petsRepository.findById({ id })

		if (!pet) {
			throw new PetNotFoundError()
		}

		return { pet }
	}
}
