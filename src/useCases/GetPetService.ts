import type { PetsRepository } from '@/repositories/PetsRepository'
import { PetNotFoundError } from '@/useCases/errors/PetNotFoundError'
import type { Pet } from '@prisma/client'

interface GetPetServiceRequest extends Pick<Pet, 'id'> {}

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
