import axios from "axios"

export async function cardUpdate(
  cardId,
  toChangeCardAtrribute,
  toChangeBoolean
) {
  return await axios.put(
    `https://api.trello.com/1/cards/${cardId}`,
    {},
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
        [toChangeCardAtrribute]: toChangeBoolean,
      },
    }
  )
}

export async function cardDelete(cardId) {
  return await axios.delete(`https://api.trello.com/1/cards/${cardId}`, {
    params: {
      key: import.meta.env.VITE_API_KEY,
      token: import.meta.env.VITE_TOKEN,
    },
  })
}

export async function addNewCard(listId, cardName) {
  return await axios.post(
    "https://api.trello.com/1/cards",
    {},
    {
      params: {
        idList: listId,
        name: cardName,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}
