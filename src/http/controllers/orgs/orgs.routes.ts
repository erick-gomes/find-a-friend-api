import type { FastifyInstance } from 'fastify'
import { authenticateOrgController } from './AuthenticateOrgController'
import { createOrgController } from './CreateOrgController'
import { getOrgController } from './GetOrgController'

export async function orgsRoutes(app: FastifyInstance) {
	app.get('/orgs/:id', getOrgController)
	app.post('/orgs', createOrgController)
	app.post('/orgs/authenticate', authenticateOrgController)
}
