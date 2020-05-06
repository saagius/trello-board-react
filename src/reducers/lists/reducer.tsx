import {
  ActionTypes,
  ErrorList,
  ErrorLists,
  CreatedList,
  FetchedLists,
  LoadingList,
  LoadingLists,
  ListState
} from "./types";

const initialState: ListState = {
  lists: [],
  loading: false
};

const listReducer = () => {
  return (
    state = initialState,
    action: CreatedList | FetchedLists | ErrorList | ErrorLists | LoadingList | LoadingLists
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_LIST:
      case ActionTypes.LOADING_LISTS:
          return { ...state, loading: action.loading };
      case ActionTypes.CREATED_LIST:
        return {
          ...state,
          lists: [
            ...state.lists.filter(list => list._id !== action.list._id),
            action.list
          ],
          loading: action.loading
        };
      case ActionTypes.FETCHED_LISTS:
        return {
          ...state,
          lists: action.lists,
          loading: action.loading
        };
      case ActionTypes.ERROR_LIST:
      case ActionTypes.ERROR_LISTS:
        return { ...state, error: action.error, loading: action.loading };
      default:
        return state;
    }
  };
};

export default listReducer;
