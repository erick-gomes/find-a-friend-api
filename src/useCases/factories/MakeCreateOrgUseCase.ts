import { PrismaOrgsRepository } from '@/repositories/prisma/PrismaOrgsRepository'
import { CreateOrgUseCase } from '../CreateOrgUseCase'

export const makeCreateOrgUseCase = () =>
	new CreateOrgUseCase(new PrismaOrgsRepository())
