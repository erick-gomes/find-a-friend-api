import { PrismaOrgsRepository } from '@/repositories/prisma/PrismaOrgsRepository'
import { AuthenticateOrgUseCase } from '../AuthenticateOrgUseCase'

export const makeAuthenticateOrgUseCase = () =>
	new AuthenticateOrgUseCase(new PrismaOrgsRepository())
