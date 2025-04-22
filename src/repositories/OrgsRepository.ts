import type { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
	create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
	findById({ id }: Pick<Org, 'id'>): Promise<Org | null>
	findByEmail({ email }: Pick<Org, 'email'>): Promise<Org | null>
}
