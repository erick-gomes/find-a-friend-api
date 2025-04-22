import type { Org } from '@prisma/client'

export interface OrgsRepository {
	create(data: Org): Promise<Org>
	findById({ id }: Pick<Org, 'id'>): Promise<Org | null>
	findByEmail({ email }: Pick<Org, 'email'>): Promise<Org | null>
}
