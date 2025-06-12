import type { PetsRepository } from '@/repositories/PetsRepository'
import { PetNotFoundError } from '@/useCases/errors/PetNotFoundError'
import type { Pet } from '@prisma/client'

interface GetPetUseCaseRequest extends Pick<Pet, 'id'> { }

interface GetPetUseCaseResponse {
	pet: Pet
}

export class GetPetUseCase {
	constructor(private petsRepository: PetsRepository) { }

	async execute({
		id,
	}: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
		const pet = await this.petsRepository.findById({ id })

		if (!pet) {
			throw new PetNotFoundError()
		}

		return { pet }
	}
}
