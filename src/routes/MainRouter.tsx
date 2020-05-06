import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Boards from "../components/Boards";
import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";
import CreateList from "../components/CreateList";
import CreateCard from "../components/CardForm";
import {
  BOARD,
  CREATE_BOARD,
  CREATE_LIST,
  CARD_FORM,
  BOARDS
} from "./Routes";

const Container = styled.div`
  width: 100%;
`;

const RoutesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
  border-radius: 5px;
  padding: 0.5rem;
`;

const MainRouter = () => {
  return (
    <Container>
      <Router>
        <RoutesContainer>
          <Switch>
            <Route
              component={Boards}
              path={BOARDS}
              exact
            />

            <Route
              component={CreateBoard}
              path={CREATE_BOARD}
              exact
            />

            <Route
              component={CreateList}
              path={CREATE_LIST}
              exact
            />

            <Route
              component={CreateCard}
              path={CARD_FORM}
              exact
            />

            <Route
              component={Board}
              path={BOARD}
              exact
            />

            {/*Intentionally left at the bottom*/}
            <Route
              exact
              path={"/*"}
              render={() => {
                return <Redirect to={BOARDS} />;
              }}
            />
          </Switch>
        </RoutesContainer>
      </Router>
    </Container>
  );
};

export default MainRouter;