import {
  ActionTypes,
  ErrorBoard,
  ErrorBoards,
  CreatedBoard,
  FetchedBoard,
  FetchedBoards,
  LoadingBoard,
  LoadingBoards,
  BoardState
} from "./types";

const initialState: BoardState = {
  boards: [],
  loading: false
};

const boardReducer = () => {
  return (
    state = initialState,
    action: CreatedBoard | FetchedBoard | FetchedBoards | ErrorBoard | ErrorBoards | LoadingBoard | LoadingBoards
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_BOARD:
      case ActionTypes.LOADING_BOARDS:
        return { ...state, loading: action.loading };

      case ActionTypes.CREATED_BOARD:
      case ActionTypes.FETCHED_BOARD:
        return {
          ...state,
          boards: [
            ...state.boards.filter(board => {
              return board._id !== action.board._id;
            }),
            action.board
          ],
          loading: action.loading
        };
      case ActionTypes.FETCHED_BOARDS:
        return {
          ...state,
          boards: action.boards,
          loading: action.loading
        };
      case ActionTypes.ERROR_BOARD:
      case ActionTypes.ERROR_BOARDS:
        return { ...state, error: action.error, loading: action.loading };
      default:
        return state;
    }
  };
};

export default boardReducer;
