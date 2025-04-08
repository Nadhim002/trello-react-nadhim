import { axiosApiInstance } from "./axiosApiInstance.js"

export async function addCheckList(checkListName, cardId) {
  return await axiosApiInstance.post(
    `/checklists`,
    {},
    {
      params: {
        name: checkListName,
        idCard: cardId,
      },
    }
  )
}

export async function deleteCheckList(checkListId) {
  return await axiosApiInstance.delete(`/checklists/${checkListId}`)
}
