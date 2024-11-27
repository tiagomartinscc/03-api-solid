import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.addHook('onRequest', verifyJWT)
  // get('/me', { onRequest: verifyJWT }, profile)
}
