import { PrismaOrgsRepository } from '@/repositories/prisma/PrismaOrgsRepository'
import { GetOrgUseCase } from '../GetOrgUseCase'

export const makeGetOrgUseCase = () =>
	new GetOrgUseCase(new PrismaOrgsRepository())
