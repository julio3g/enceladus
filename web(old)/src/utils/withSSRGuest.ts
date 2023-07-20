import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'

// SSR => Server Side Rendering

export function withSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (cookies['enceladus.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
