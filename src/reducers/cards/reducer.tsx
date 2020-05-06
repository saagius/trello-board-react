import {
  ActionTypes,
  CardState,
  CreatedCardByList,
  UpdatedCardByList,
  MovedCardToList,
  FetchedCardsByList,
  DeletedCard,
  ErrorCardByList,
  ErrorCardsByList,
  LoadingCardByList,
  LoadingCardsByList
} from "./types";

const initialState: CardState = {
  cards: {},
  loading: false
};

const cardReducer = () => {
  return (
    state = initialState,
    action: CreatedCardByList | UpdatedCardByList | MovedCardToList | FetchedCardsByList | DeletedCard | ErrorCardByList | ErrorCardsByList | LoadingCardByList | LoadingCardsByList
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_CARD_BY_LIST:
      case ActionTypes.LOADING_CARDS_BY_LIST:
        return { 
          ...state,
          cards: {
            ...state.cards,
            [action.list]: {
              ...state.cards[action.list],
              loading: action.loading
            }
          }
        };
      case ActionTypes.UPDATED_CARD_BY_LIST:
      case ActionTypes.CREATED_CARD_BY_LIST:
        return {
          ...state,
          cards: {
            ...state.cards,
            [action.list]: {
              ...state.cards[action.list],
              cards: [
                ...state.cards[action.list].cards.filter(card => card._id !== action.card._id),
                action.card
              ],
              loading: action.loading
            }
          }
        };
      case ActionTypes.MOVED_CARD_TO_LIST:
        return {
          ...state,
          cards: {
            ...state.cards,
            [action.list]: {
              ...state.cards[action.list],
              cards: [
                ...state.cards[action.list].cards.filter(card => card._id !== action.card._id),
                action.card
              ],
              loading: action.loading
            },
            [action.oldList]: {
              ...state.cards[action.oldList],
              cards: [
                ...state.cards[action.oldList].cards.filter(card => card._id !== action.card._id)
              ],
              loading: action.loading
            }
          }
        };
      case ActionTypes.FETCHED_CARDS_BY_LIST:
        return {
          ...state,
          cards: {
            ...state.cards,
            [action.list]: {
              ...state.cards[action.list],
              cards: action.cards,
              loading: action.loading
            }
          }
        };
      case ActionTypes.DELETED_CARD:
        return {
          ...state,
          cards: {
            ...state.cards,
            [action.list]: {
              ...state.cards[action.list],
              cards: [
                ...state.cards[action.list].cards.filter(card => card._id !== action.card._id)
              ],
              loading: action.loading
            }
          }
        };
      case ActionTypes.ERROR_CARD_BY_LIST:
      case ActionTypes.ERROR_CARDS_BY_LIST:
        return { 
          ...state,
          cards: {
            ...state.cards,
            [action.list]: {
              ...state.cards[action.list],
              error: action.error
            }
          }
        };
      default:
        return state;
    }
  };
};

export default cardReducer;
