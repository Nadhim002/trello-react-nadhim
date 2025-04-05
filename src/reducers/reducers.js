export function boardReducer(state, action) {
  
  switch (action.type) {
    case "set_data":
      return { ...state, loading: false, boardsData : action.boardsData }
    case "error":
      return { ...state, loading: false, error: true }
    case "add":
      return {
        ...state,
        boardsData: [...(state.boardsData ?? []), action.newBoard],
      }
    default:
      return state
  }
}

export function cardReducer(state, action) {
  switch (action.type) {
    case "set_data":
      return action.data
    case "add": {
      const cardDataObj = action.cardDataObj
      const listId = cardDataObj.idList

      return {
        ...state,
        [listId]: [...(state[listId] || []), cardDataObj],
      }
    }
    case "change_status": {
      const updatedCard = action.updatedCard
      const { idList } = updatedCard
      const updatedCardOfGivenList = state[idList].map((card) => {
        if (card.id == updatedCard.id) {
          return updatedCard
        }
        return card
      })
      return { ...state, [idList]: updatedCardOfGivenList }
    }
    case "delete": {
      const cardId = action.cardId
      const listId = action.listId
      const updatedCardOfGivenList = state[listId].filter((card) => {
        if (card.id == cardId) {
          console.log(card)
          return false
        }
        return true
      })
      return { ...state, [listId]: updatedCardOfGivenList }
    }
    default:
      return state
  }
}

export function listReducer(state, action) {
  switch (action.type) {
    case "set_data":
      return action.data
    case "add":
      return [...state, action.newList]
    case "archive":
      return state.filter((list) => list.id != action.archivedListId)
    default:
      return state
  }
}

export function CheckListReducer(state, action) {
  switch (action.type) {
    case "set_data":
      return action.data ?? []
    case "add": {
      const { checkItems, ...checkList } = action.checkList
      return [...state, checkList]
    }
    case "delete":
      return state.filter((checkList) => checkList.id != action.checkListId)
    default:
      return state
  }
}

export function checkItemReducer(state, action) {
  switch (action.type) {
    case "set_data":
      return action.data ?? {}
    case "add": {
      const { idChecklist } = action.newCheckItem
      const updatedCheckItems = [
        ...(state[idChecklist] ?? []),
        action.newCheckItem,
      ]
      return { ...state, [idChecklist]: updatedCheckItems }
    }
    case "delete": {
      const checkListId = action.checkListId
      const checkItemId = action.checkItemId
      const updatedCheckItems = state[checkListId].filter(
        (checkItem) => checkItem.id != checkItemId
      )

      return { ...state, [checkListId]: updatedCheckItems }
    }
    case "update": {
      const updatedCheckItem = action.updatedCheckItem
      const { idChecklist } = updatedCheckItem
      const updatedCheckItems = state[idChecklist].map((checkItem) => {
        if (checkItem.id == updatedCheckItem.id) {
          return updatedCheckItem
        }
        return checkItem
      })
      return { ...state, [idChecklist]: updatedCheckItems }
    }
    default:
      return state
  }
}
