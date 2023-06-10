import { verifyJWT } from '@/http/middlewares/verifyJwt'
import { FastifyInstance } from 'fastify'
import { AuthenticateController } from './authenticate'
import { DeleteUserController } from './delete'
import { EditUserController } from './edit'
import { ProfileController } from './profile'
import { RefreshTokenController } from './refresh'
import { RegisterController } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', new RegisterController().handle)
  app.post('/sessions', new AuthenticateController().handle)
  app.patch('/token/refresh', new RefreshTokenController().handle)
  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, new ProfileController().handle)
  app.put('/edit', { onRequest: [verifyJWT] }, new EditUserController().handle)
  app.delete(
    '/:userId',
    { onRequest: [verifyJWT] },
    new DeleteUserController().handle,
  )
}
