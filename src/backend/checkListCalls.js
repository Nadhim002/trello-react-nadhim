async function addCheckList(checkListName) {
  return await axios.post(
    `https://api.trello.com/1/checklists`,
    {},
    {
      params: {
        name: checkListName,
        idCard: selectedCardInfo.id,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    }
  )
}

async function deleteCheckList(checkListId) {
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
