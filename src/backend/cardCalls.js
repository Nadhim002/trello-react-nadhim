import { axiosApiInstance } from "./axiosApiInstance.js"

export async function cardUpdate(
  cardId,
  toChangeCardAtrribute,
  toChangeBoolean
) {
  return await axiosApiInstance.put(
    `/cards/${cardId}`,
    {},
    {
      params: {
        [toChangeCardAtrribute]: toChangeBoolean,
      },
    }
  )
}

export async function cardDelete(cardId) {
  return await axiosApiInstance.delete(`/cards/${cardId}`)
}

export async function addNewCard(listId, cardName) {
  return await axiosApiInstance.post(
    "/cards",
    {},
    {
      params: {
        idList: listId,
        name: cardName,
      },
    }
  )
}
