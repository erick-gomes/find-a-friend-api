import type { PetsRepository } from '@/repositories/PetsRepository'
import { OrgNotFoundError } from '@/useCases/errors/OrgNotFoundError'
import type { Pet, Prisma } from '@prisma/client'

interface CreatePetServiceRequest
	extends Omit<Prisma.PetUncheckedCreateInput, 'id'> {}
interface CreatePetServiceResponse {
	pet: Pet
}

export class CreatePetService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		ownerId,
		name,
		description,
		age,
		breed,
		color,
		size,
	}: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
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
