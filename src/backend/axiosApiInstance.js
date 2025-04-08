import axios from "axios"

const baseURL = "https://api.trello.com/1"

export const axiosApiInstance = axios.create({
  baseURL: baseURL,
  params: {
    key: import.meta.env.VITE_API_KEY,
    token: import.meta.env.VITE_TOKEN,
  },
})
