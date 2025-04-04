import axios from "axios"

export async function getBoardInfo(boardId) {
  const boardDataResponse = axios.get(
    `https://api.trello.com/1/boards/${boardId}`,
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )

  const listsDataResponse = axios.get(
    `https://api.trello.com/1/boards/${boardId}/lists`,
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )

  const cardsDataReponse = axios.get(
    `https://api.trello.com/1/boards/${boardId}/cards`,
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )

  return await Promise.all([
    boardDataResponse,
    listsDataResponse,
    cardsDataReponse,
  ])
}
