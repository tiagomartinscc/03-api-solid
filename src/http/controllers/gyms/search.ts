import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsUseCase }
  from 'src/use-cases/factories/make-search-gyms-use-case'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQueryParmsSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const {
    q,
    page,
  } = searchGymsQueryParmsSchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(201).send({
    gyms,
  })
}
