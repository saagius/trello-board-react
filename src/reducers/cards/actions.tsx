import { ThunkDispatch } from "redux-thunk";
import { 
  ActionTypes,
  CreatedCardByList,
  UpdatedCardByList,
  FetchedCardsByList,
  DeletedCard,
  ErrorCardByList,
  ErrorCardsByList,
  LoadingCardByList,
  LoadingCardsByList
} from "./types";
import { getDomain } from "../../helpers/Domain";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";
import { Card } from "../../model/Card";

interface CardResponse {
  success: boolean;
  data: Card;
  message: string;
}

interface CardsResponse {
  success: boolean;
  data: Card[];
  message: string;
}

export const fetchCardsByListId = (id: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedCardsByList | ErrorCardsByList | LoadingCardsByList>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_CARDS_BY_LIST,
      loading: true,
      list: id
    });

    fetch(`${getDomain()}/list/${id}/cards`, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then(res => res.json())
      .then((response: CardsResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.FETCHED_CARDS_BY_LIST,
            loading: false,
            list: id,
            cards: response.data
          });
        }

        dispatch({
          type: ActionTypes.ERROR_CARDS_BY_LIST,
          error: response.message,
          list: id,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_CARDS_BY_LIST,
          error,
          list: id,
          loading: false
        });
      });
  };
};

export const createCard = (list: string, card: Card): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, CreatedCardByList | ErrorCardByList | LoadingCardByList>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_CARD_BY_LIST,
      loading: true,
      list
    });

    fetch(`${getDomain()}/list/${list}/cards`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: PROTOCOL_METHOD.POST,
      body: JSON.stringify(card)
    })
      .then(res => res.json())
      .then((response: CardResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.CREATED_CARD_BY_LIST,
            loading: false,
            card: response.data,
            list
          });
        }

        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error: response.message,
          loading: false,
          list
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error,
          loading: false,
          list
        });
      });
  };
};

export const moveCardToList = (list: string, card: Card): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, DeletedCard | ErrorCardByList | LoadingCardByList>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_CARD_BY_LIST,
      loading: true,
      list
    });

    const oldList = card.list;
    const updatedCard = {
      ...card,
      list
    }

    fetch(`${getDomain()}/list/${list}/cards/${card._id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: PROTOCOL_METHOD.PUT,
      body: JSON.stringify(updatedCard)
    })
      .then(res => res.json())
      .then((response: CardResponse) => {
        if(response.success) {
          dispatch(fetchCardsByListId(list));

          return dispatch({
            type: ActionTypes.DELETED_CARD,
            loading: false,
            card: response.data,
            list: oldList
          });
        }

        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error: response.message,
          loading: false,
          list
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error,
          loading: false,
          list
        });
      });
  };
};

export const deleteCard = (list: string, id: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, DeletedCard | ErrorCardByList | LoadingCardByList>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_CARD_BY_LIST,
      loading: true,
      list
    });
    
    fetch(`${getDomain()}/list/${list}/cards/${id}`, HTTP_OPTIONS(PROTOCOL_METHOD.DELETE))
      .then(res => res.json())
      .then((response: CardResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.DELETED_CARD,
            loading: false,
            card: response.data,
            list
          });
        }

        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error: response.message,
          loading: false,
          list
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error,
          loading: false,
          list
        });
      });
  };
};

export const updateCard = (list: string, card: Card): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, UpdatedCardByList | ErrorCardByList | LoadingCardByList>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_CARD_BY_LIST,
      loading: true,
      list
    });

    fetch(`${getDomain()}/list/${list}/cards/${card._id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: PROTOCOL_METHOD.PUT,
      body: JSON.stringify(card)
    })
      .then(res => res.json())
      .then((response: CardResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.UPDATED_CARD_BY_LIST,
            loading: false,
            card: response.data,
            list
          });
        }

        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error: response.message,
          loading: false,
          list
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_CARD_BY_LIST,
          error,
          loading: false,
          list
        });
      });
  };
};