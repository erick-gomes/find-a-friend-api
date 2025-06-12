import { PrismaPetsRepository } from '@/repositories/prisma/PrismaPetsRepository'
import { GetPetUseCase } from '../GetPetUseCase'

export const makeGetPetUseCase = () =>
	new GetPetUseCase(new PrismaPetsRepository())
