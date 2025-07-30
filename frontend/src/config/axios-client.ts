"use client"

import axios, { type CreateAxiosDefaults } from "axios"

const axiosProps: CreateAxiosDefaults<any> = {
  withCredentials: true,
}

axiosProps.baseURL = process.env.NEXT_PUBLIC_API_URL

// if (typeof window === "object") {
//   if (window.location.host.includes("localhost")) {
// axiosProps.baseURL = process.env.NEXT_PUBLIC_API_URL
//   } else {
//     axiosProps.baseURL = "/api"
//   }
// }

export const httpClient = axios.create(axiosProps)
export const baseApiURL = axiosProps.baseURL?.toString() ?? ""

httpClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
