import { List } from "../../model/List";

export enum ActionTypes {
  LOADING_LIST = "LOADING_LIST",
  LOADING_LISTS = "LOADING_LISTS",
  CREATED_LIST = "CREATED_LIST",
  FETCHED_LISTS = "FETCHED_LISTS",
  ERROR_LIST = "ERROR_LIST",
  ERROR_LISTS = "ERROR_LISTS"
}

/**
 * Action Types
 */
export type LoadingList = {
  type: ActionTypes.LOADING_LIST;
  loading: boolean;
};
export type LoadingLists = {
  type: ActionTypes.LOADING_LISTS;
  loading: boolean;
};
export type CreatedList = {
  list: List;
  type: ActionTypes.CREATED_LIST;
  loading: boolean;
};
export type FetchedLists = {
  lists: List[];
  type: ActionTypes.FETCHED_LISTS;
  loading: boolean;
};
export type ErrorList = {
  type: ActionTypes.ERROR_LIST;
  error: string;
  loading: boolean;
};
export type ErrorLists = {
  type: ActionTypes.ERROR_LISTS;
  error: string;
  loading: boolean;
};

/**
 * State Type
 */
export type ListState = {
  lists: List[];
  loading: boolean;
  error?: string;
};
