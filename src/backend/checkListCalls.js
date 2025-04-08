import axios from "axios"

export async function addCheckList(checkListName , cardId  ) {
  return await axios.post(
    `https://api.trello.com/1/checklists`,
    {},
    {
      params: {
        name: checkListName,
        idCard: cardId ,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}

export async function deleteCheckList(checkListId) {
  return await axios.delete(
    `https://api.trello.com/1/checklists/${checkListId}`,
    {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}
