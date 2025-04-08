import { axiosApiInstance } from "./axiosApiInstance"

export async function addNewBoard(newBoardName) {
  return await axiosApiInstance.post(
    "boards/",
    {},
    {
      params: {
        name: newBoardName,
      },
    }
  )
}
