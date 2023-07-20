import { AuthTokenError } from '@/services/errors/AuthTokenError'
import jwtDecode from 'jwt-decode'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'

type WithSSRAuthOptions = {
  role?: 'ADMIN' | 'MEMBER'
}

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['enceladus.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'enceladus.token')
        destroyCookie(ctx, 'refreshToken')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
    const test = jwtDecode(token)

    console.log(test)

    // if (options) {
    //   const user = decode<{ role: 'ADMIN' | 'MEMBER' }>(token)
    //   const { role } = options

    //   const userHasValidPermissions = validateUserPermissions({
    //     user,
    //     role,
    //   })

    //   if (!userHasValidPermissions) {
    //     return {
    //       redirect: {
    //         destination: '/dashboard',
    //         permanent: false,
    //       },
    //     }
    //   }
    // }

    // try {
    //   return await fn(ctx)
    // } catch (err) {
    //   if (err instanceof AuthTokenError) {
    //     destroyCookie(ctx, 'enceladus.token')
    //     destroyCookie(ctx, 'enceladus.refreshToken')

    //     return {
    //       redirect: {
    //         destination: '/',
    //         permanent: false,
    //       },
    //     }
    //   }
    // }
  }
}
