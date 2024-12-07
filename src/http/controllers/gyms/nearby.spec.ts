import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'src/app'
import { createAndAuthenticateUser }
  from 'src/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '11999999999',
        latitude: -29.91756106273859,
        longitude: -51.16615217062439,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description.',
        phone: '11999999999',
        latitude: -30.029365448779267,
        longitude: -51.23184700250266,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -29.91756106273859,
        longitude: -51.16615217062439,
      })
      .set('Authorization', `Bearer ${token}`)
      .send({
      })
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
