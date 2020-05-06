import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { BoardState } from "./boards/types";
import boardReducer from "./boards/reducer";
import { ListState } from "./lists/types";
import listReducer from "./lists/reducer";
import { CardState } from "./cards/types";
import cardReducer from "./cards/reducer";

export type RootState = {
  boards: BoardState;
  lists: ListState;
  cards: CardState;
};

const rootReducer = combineReducers({
  boards: boardReducer(),
  lists: listReducer(),
  cards: cardReducer()
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;