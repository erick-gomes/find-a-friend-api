import { PrismaPetsRepository } from '@/repositories/prisma/PrismaPetsRepository'
import { SearchPetsUseCase } from '../SearchPetsUseCase'

export const makeSearchPetsUseCase = () =>
	new SearchPetsUseCase(new PrismaPetsRepository())
