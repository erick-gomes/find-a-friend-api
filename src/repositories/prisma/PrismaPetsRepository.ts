import { type Pet, type Prisma, PrismaClient } from '@prisma/client'
import type { FindAllParams, PetsRepository } from '../PetsRepository'

export class PrismaPetsRepository implements PetsRepository {
	private prisma: PrismaClient

	constructor() {
		this.prisma = new PrismaClient()
	}
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		return this.prisma.pet.create({
			data,
		})
	}
	findById({ id }: Pick<Pet, 'id'>): Promise<Pet | null> {
		return this.prisma.pet.findUnique({
			where: { id },
		})
	}
	findAll(params: FindAllParams): Promise<Pet[]> {
		return this.prisma.pet.findMany({
			where: { ...params },
		})
	}
}
