import { FastifyInstance } from 'fastify'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { verifyJwt } from 'src/http/middlewares/verify-jwt'
import { validate } from './validate'
import { verifyUserRole } from 'src/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', {
    onRequest: [verifyUserRole('ADMIN')],
  }, validate)
}
