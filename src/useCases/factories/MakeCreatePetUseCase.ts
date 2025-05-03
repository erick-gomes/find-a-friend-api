import { PrismaOrgsRepository } from '@/repositories/prisma/PrismaOrgsRepository'
import { PrismaPetsRepository } from '@/repositories/prisma/PrismaPetsRepository'
import { CreatePetUseCase } from '../CreatePetUseCase'

export const makeCreatePetUseCase = () =>
	new CreatePetUseCase(new PrismaPetsRepository(), new PrismaOrgsRepository())
