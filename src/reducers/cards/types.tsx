import { Card } from "../../model/Card";

export enum ActionTypes {
  LOADING_CARD_BY_LIST = "LOADING_CARD_BY_LIST",
  LOADING_CARDS_BY_LIST = "LOADING_CARDS_BY_LIST",
  CREATED_CARD_BY_LIST = "CREATED_CARD_BY_LIST",
  UPDATED_CARD_BY_LIST = "UPDATED_CARD_BY_LIST",
  MOVED_CARD_TO_LIST = "MOVED_CARD_TO_LIST",
  FETCHED_CARDS_BY_LIST = "FETCHED_CARDS_BY_LIST",
  DELETED_CARD = "DELETED_CARD",
  ERROR_CARD_BY_LIST = "ERROR_CARD_BY_LIST",
  ERROR_CARDS_BY_LIST = "ERROR_CARDS_BY_LIST"
}

/**
 * Action Types
 */
export type LoadingCardByList = {
  type: ActionTypes.LOADING_CARD_BY_LIST;
  loading: boolean;
  list: string;
};
export type LoadingCardsByList = {
  type: ActionTypes.LOADING_CARDS_BY_LIST;
  loading: boolean;
  list: string;
};
export type MovedCardToList = {
  card: Card;
  type: ActionTypes.MOVED_CARD_TO_LIST;
  loading: boolean;
  oldList: string;
  list: string;
};
export type CreatedCardByList = {
  card: Card;
  type: ActionTypes.CREATED_CARD_BY_LIST;
  loading: boolean;
  list: string;
};
export type UpdatedCardByList = {
  card: Card;
  type: ActionTypes.UPDATED_CARD_BY_LIST;
  loading: boolean;
  list: string;
};
export type FetchedCardsByList = {
  cards: Card[];
  type: ActionTypes.FETCHED_CARDS_BY_LIST;
  loading: boolean;
  list: string;
};
export type DeletedCard = {
  card: Card;
  type: ActionTypes.DELETED_CARD;
  loading: boolean;
  list: string;
};
export type ErrorCardByList = {
  type: ActionTypes.ERROR_CARD_BY_LIST;
  error: string;
  loading: boolean;
  list: string;
};
export type ErrorCardsByList = {
  type: ActionTypes.ERROR_CARDS_BY_LIST;
  error: string;
  loading: boolean;
  list: string;
};

export interface CardsByListState {
  cards: Card[];
  loading: boolean;
  error?: string;
}

export interface CardsByList {
  [x:string]: CardsByListState;
}

/**
 * State Type
 */
export type CardState = {
  cards: CardsByList;
  loading: boolean;
  error?: string;
};
