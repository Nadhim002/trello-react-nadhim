import { axiosApiInstance } from "./axiosApiInstance.js"

export async function addNewCheckItem(newCheckItemName, checkListId) {
  return await axiosApiInstance.post(
    `/checklists/${checkListId}/checkItems`,
    {},
    {
      params: {
        name: newCheckItemName,
      },
    }
  )
}

export async function deleteCheckItem(checkListId, checkItemId) {
  return await axiosApiInstance.delete(
    `/checklists/${checkListId}/checkItems/${checkItemId}`
  )
}

export async function toggleCheckItemStatus(
  cardId,
  checkListId,
  checkItemId,
  checked
) {
  return await axiosApiInstance.put(
    `/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItemId}`,
    {},
    {
      params: {
        state: checked ? "complete" : "incomplete",
      },
    }
  )
}
