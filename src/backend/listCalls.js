import axios from "axios"

export async function addNewList(newListName, boardId) {
  return await axios.post(
    "https://api.trello.com/1/lists",
    {},
    {
      params: {
        name: newListName,
        idBoard: boardId,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}

export async function archiveList(listId) {
  return await axios.put(
    `https://api.trello.com/1/lists/${listId}/closed`,
    {},
    {
      params: {
        value: true,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}
