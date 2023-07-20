import { FastifyReply, FastifyRequest } from 'fastify'

export class RefreshTokenController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    try {
      await request.jwtVerify({ onlyCookie: true })

      const { role } = request.user

      const token = await replay.jwtSign(
        { role },
        { sign: { sub: request.user.sub } },
      )

      const refreshToken = await replay.jwtSign(
        { role },
        {
          sign: {
            sub: request.user.sub,
            expiresIn: '7d', // expire in 7 days
          },
        },
      )

      return replay
        .setCookie('refreshToken', refreshToken, {
          path: '/', // todas as rotas poderão usar
          secure: true, // sera encriptado o refreshToken e o frontend veja criptografado
          sameSite: true, // mesmo site que vai acessar ele
          httpOnly: false, // o cookie so poderá ser acessado pelo backend
        })
        .status(200)
        .send({ token })
    } catch (err) {
      replay.clearCookie('refreshToken')
    }
  }
}
