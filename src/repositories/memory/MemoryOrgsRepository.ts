import type { OrgsRepository } from '@/repositories/OrgsRepository'
import type { Prisma, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class MemoryOrgsRepository implements OrgsRepository {
	private orgs: Org[] = []
	async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
		const org: Org = { ...data, id: randomUUID() }
		this.orgs.push(org)
		return org
	}
	async findById({ id }: Pick<Org, 'id'>): Promise<Org | null> {
		const org = this.orgs.find((org) => org.id === id)
		return org || null
	}
	async findByEmail({ email }: Pick<Org, 'email'>): Promise<Org | null> {
		const org = this.orgs.find((org) => org.email === email)
		return org || null
	}
}
