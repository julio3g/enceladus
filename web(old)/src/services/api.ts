import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOut } from './signOut'

let isRefreshing = false
let failedRequestsQueue: any[] = []
export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined,
) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${cookies['enceladus.token']}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.message === '') {
          cookies = parseCookies(ctx)

          const { refreshToken } = cookies
          const originalConfig = error.config
          if (!isRefreshing) {
            isRefreshing = true
            console.log('refresh') // gerou mais de 8000 'refresh'
            api
              .patch('/token/refresh', {
                headers: { Authorization: `Bearer ${refreshToken}` },
              })
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, 'enceladus.token', token, {
                  maxAge: 60 * 60 * 24 * 7, // 7 days
                  path: '/',
                })

                api.defaults.headers.Authorization = `Bearer ${token}`
                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token),
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []
                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig!.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig!))
              },
              OnFailure: (err: AxiosError) => reject(err),
            })
          })
        } else {
          if (process.browser) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }
      return Promise.reject(error)
    },
  )

  return api
}
