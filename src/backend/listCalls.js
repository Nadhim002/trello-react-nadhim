import { axiosApiInstance } from "./axiosApiInstance.js"

export async function addNewList(newListName, boardId) {
  return await axiosApiInstance.post(
    "/lists",
    {},
    {
      params: {
        name: newListName,
        idBoard: boardId,
      },
    }
  )
}

export async function archiveList(listId) {
  return await axiosApiInstance.put(
    `/lists/${listId}/closed`,
    {},
    {
      params: {
        value: true,
      },
    }
  )
}
