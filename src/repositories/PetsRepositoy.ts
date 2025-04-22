import type { Pet } from '@prisma/client'

interface FindAllParams
	extends Partial<Omit<Pet, 'id' | 'ownerId' | 'name' | 'description'>> {
	city: string
}

export interface PetsRepository {
	create(data: Pet): Promise<Pet>
	findById({ id }: Pick<Pet, 'id'>): Promise<Pet | null>
	findAll(params: FindAllParams): Promise<Pet[]>
}
