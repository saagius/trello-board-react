import { ThunkDispatch } from "redux-thunk";
import { 
  ActionTypes,
  ErrorList,
  ErrorLists, 
  CreatedList,
  FetchedLists, 
  LoadingList, 
  LoadingLists
} from "./types";
import { getDomain } from "../../helpers/Domain";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";
import { List } from "../../model/List";

interface ListResponse {
  success: boolean;
  data: List;
  message: string;
}

interface ListsResponse {
  success: boolean;
  data: List[];
  message: string;
}

export const fetchListsByBoardId = (boardId: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedLists | ErrorLists | LoadingLists>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_LISTS,
      loading: true
    });

    fetch(`${getDomain()}/board/${boardId}/lists`, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then(res => res.json())
      .then((response: ListsResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.FETCHED_LISTS,
            loading: false,
            lists: response.data
          });
        }

        dispatch({
          type: ActionTypes.ERROR_LISTS,
          error: response.message,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_LISTS,
          error,
          loading: false
        });
      });
  };
};

export const createList = (boardId: string, list: List): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, CreatedList | ErrorList | LoadingList>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_LIST,
      loading: true
    });

    fetch(`${getDomain()}/board/${boardId}/lists`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: PROTOCOL_METHOD.POST,
      body: JSON.stringify(list)
    })
      .then(res => res.json())
      .then((response: ListResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.CREATED_LIST,
            loading: false,
            list: response.data
          });
        }

        dispatch({
          type: ActionTypes.ERROR_LIST,
          error: response.message,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_LIST,
          error,
          loading: false
        });
      });
  };
};