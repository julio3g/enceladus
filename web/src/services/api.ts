import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let isRefreshing = false
let failedRequestsQueue: any[] = []
export function setupAPIClient(ctx = undefined) {
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
        if (error.response.data?.code === 'Invalid credentials.') {
          cookies = parseCookies()

          const { refreshToken } = cookies
          const originalConfig = error.config
          if (!isRefreshing) {
            isRefreshing = true
            api
              .patch('/token/refresh', {
                headers: { Authorization: `Bearer ${refreshToken}` },
              })
              .then((response) => {
                const { token } = response.data

                setCookie(undefined, 'enceladus.token', token, {
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
          // signOut
        }
      }
    },
  )
  // api.interceptors.response.use(
  //   (response) => {
  //     return response
  //   },
  //   (error: AxiosError) => {
  //     if (error?.response?.status === 401) {
  //       if (error.response.data?.message === 'Unauthorized.') {
  //         cookies = parseCookies(ctx)

  //         const { 'refreshToken': refreshToken } = cookies
  //         const originalConfig = error.config

  //         if (!isRefreshing) {
  //           isRefreshing = true

  //           api
  //             .post('/token/refresh', {
  //               refreshToken,
  //             })
  //             .then((response) => {
  //               const { token } = response.data

  //               setCookie(ctx, 'enceladus.token', token, {
  //                 maxAge: 60 * 60 * 24 * 30, // 30 days
  //                 path: '/',
  //               })

  //               setCookie(
  //                 ctx,
  //                 'refreshToken',
  //                 response.data.refreshToken,
  //                 {
  //                   maxAge: 60 * 60 * 24 * 30, // 30 days
  //                   path: '/',
  //                 },
  //               )

  //               api.defaults.headers.Authorization = `Bearer ${token}`

  //               failedRequestsQueue.forEach((request) =>
  //                 request.onSuccess(token),
  //               )
  //               failedRequestsQueue = []
  //             })
  //             .catch((err) => {
  //               failedRequestsQueue.forEach((request) => request.onFailure(err))
  //               failedRequestsQueue = []

  //               if (process.browser) {
  //                 signOut()
  //               }
  //             })
  //             .finally(() => {
  //               isRefreshing = false
  //             })
  //         }

  //         return new Promise((resolve, reject) => {
  //           failedRequestsQueue.push({
  //             onSuccess: (token: string) => {
  //               originalConfig!.headers.Authorization = `Bearer ${token}`

  //               resolve(api(originalConfig!))
  //             },
  //             onFailure: (err: AxiosError) => {
  //               reject(err)
  //             },
  //           })
  //         })
  //       } else {
  //         if (process.browser) {
  //           const router = useRouter()

  //           destroyCookie(undefined, 'enceladus.token')
  //           destroyCookie(undefined, 'refreshToken')

  //           authChannel.postMessage('signOut')
  //           router.push('/')
  //         } else {
  //           return Promise.reject(new AuthTokenError())
  //         }
  //       }
  //     }

  //     return Promise.reject(error)
  //   },
  // )

  return api
}
