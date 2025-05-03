import { type Org, type Prisma, PrismaClient } from '@prisma/client'
import type { OrgsRepository } from '../OrgsRepository'

export class PrismaOrgsRepository implements OrgsRepository {
	private prisma: PrismaClient

	constructor() {
		this.prisma = new PrismaClient()
	}
	create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
		return this.prisma.org.create({
			data,
		})
	}
	findById({ id }: Pick<Org, 'id'>): Promise<Org | null> {
		return this.prisma.org.findUnique({
			where: { id },
		})
	}
	findByEmail({ email }: Pick<Org, 'email'>): Promise<Org | null> {
		return this.prisma.org.findUnique({
			where: { email },
		})
	}
}
