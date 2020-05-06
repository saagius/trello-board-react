import { Board } from "../../model/Board";

export enum ActionTypes {
  LOADING_BOARD = "LOADING_BOARD",
  LOADING_BOARDS = "LOADING_BOARDS",
  CREATED_BOARD = "CREATED_BOARD",
  FETCHED_BOARD = "FETCHED_BOARD",
  FETCHED_BOARDS = "FETCHED_BOARDS",
  ERROR_BOARD = "ERROR_BOARD",
  ERROR_BOARDS = "ERROR_BOARDS"
}

/**
 * Action Types
 */
export type LoadingBoard = {
  type: ActionTypes.LOADING_BOARD;
  loading: boolean;
};
export type LoadingBoards = {
  type: ActionTypes.LOADING_BOARDS;
  loading: boolean;
};
export type CreatedBoard = {
  board: Board;
  type: ActionTypes.CREATED_BOARD;
  loading: boolean;
};
export type FetchedBoard = {
  board: Board;
  type: ActionTypes.FETCHED_BOARD;
  loading: boolean;
};
export type FetchedBoards = {
  boards: Board[];
  type: ActionTypes.FETCHED_BOARDS;
  loading: boolean;
};
export type ErrorBoard = {
  type: ActionTypes.ERROR_BOARD;
  error: string;
  loading: boolean;
};
export type ErrorBoards = {
  type: ActionTypes.ERROR_BOARDS;
  error: string;
  loading: boolean;
};

/**
 * State Type
 */
export type BoardState = {
  boards: Board[];
  loading: boolean;
  error?: string;
};
