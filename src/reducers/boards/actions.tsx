import { ThunkDispatch } from "redux-thunk";
import { 
  ActionTypes, 
  ErrorBoard, 
  ErrorBoards, 
  CreatedBoard,
  FetchedBoard, 
  FetchedBoards, 
  LoadingBoard, 
  LoadingBoards 
} from "./types";
import { getDomain } from "../../helpers/Domain";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";
import { Board } from "../../model/Board";

interface BoardsResponse {
  success: boolean;
  data: Board[];
  message: string;
}

interface BoardResponse {
  success: boolean;
  data: Board;
  message: string;
}

export const fetchBoards = (): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedBoards | ErrorBoards | LoadingBoards>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_BOARDS,
      loading: true
    });

    fetch(`${getDomain()}/boards`, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then(res => res.json())
      .then((response: BoardsResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.FETCHED_BOARDS,
            loading: false,
            boards: response.data
          });
        }

        dispatch({
          type: ActionTypes.ERROR_BOARDS,
          error: response.message,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_BOARDS,
          error,
          loading: false
        });
      });
  };
};

export const fetchBoardById = (boardId: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedBoard | ErrorBoard | LoadingBoard>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_BOARD,
      loading: true
    });

    fetch(`${getDomain()}/boards/${boardId}`, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then(res => res.json())
      .then((response: BoardResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.FETCHED_BOARD,
            loading: false,
            board: response.data
          });
        }

        dispatch({
          type: ActionTypes.ERROR_BOARD,
          error: response.message,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_BOARD,
          error,
          loading: false
        });
      });
  };
};

export const createBoard = (board: Board): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, CreatedBoard | ErrorBoard | LoadingBoard>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_BOARD,
      loading: true
    });

    fetch(`${getDomain()}/boards`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: PROTOCOL_METHOD.POST,
      body: JSON.stringify(board)
    })
      .then(res => res.json())
      .then((response: BoardResponse) => {
        if(response.success) {
          return dispatch({
            type: ActionTypes.CREATED_BOARD,
            loading: false,
            board: response.data
          });
        }

        dispatch({
          type: ActionTypes.ERROR_BOARD,
          error: response.message,
          loading: false
        });
      })
      .catch((error: string) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ERROR_BOARD,
          error,
          loading: false
        });
      });
  };
};
