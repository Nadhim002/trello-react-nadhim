import axios from "axios"

export async function addNewCheckItem(newCheckItemName, checkListId) {
  return await axios.post(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
    {},
    {
      params: {
        name: newCheckItemName,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}

export async function deleteCheckItem(checkListId, checkItemId) {
  return await axios.delete(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}

export async function toggleCheckItemStatus(
  cardId,
  checkListId,
  checkItemId,
  checked
) {
  return await axios.put(
    `https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItemId}`,
    {},
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
        state: checked ? "complete" : "incomplete",
      },
    }
  )
}
