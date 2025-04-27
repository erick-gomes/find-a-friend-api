import type { PetsRepository } from '@/repositories/PetsRepository'
import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import type { Pet, Prisma } from '@prisma/client'

interface CreatePetUseCaseRequest
	extends Omit<Prisma.PetUncheckedCreateInput, 'id'> {}
interface CreatePetUseCaseResponse {
	pet: Pet
}

export class CreatePetUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		ownerId,
		name,
		description,
		age,
		breed,
		color,
		size,
	}: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
		const org = await this.petsRepository.findById({
			id: ownerId,
		})
		if (!org) {
			throw new OrgNotFoundError()
		}
		const pet = await this.petsRepository.create({
			ownerId,
			name,
			description,
			age,
			breed,
			color,
			size,
		})

		return { pet }
	}
}
