import axios from "axios"

export  async function addNewBoard(newBoardName) {

    return await axios.post(
      "https://api.trello.com/1/boards/",
      {},
      {
        params: {
          name: newBoardName,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_TOKEN,
        },
      }
    )

  }