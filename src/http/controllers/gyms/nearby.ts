import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearbyGymsUseCase }
  from 'src/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQueryParmsSchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    latitude,
    longitude,
  } = nearbyGymsQueryParmsSchema.parse(request.body)

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()
  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({
    gyms,
  })
}
