import React from "react";
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../reducers/store";
import { List } from "../model/List";
import { Card as CardModel } from "../model/Card";
import Card from "./Card";
import * as CardsActions from "../reducers/cards/actions";
import { CardsByListState } from "../reducers/cards/types";
import {
  FlexWrapper,
  Description,
  Container,
  TomatoButton
} from "../styles";

const ListFlexWrapper = styled(FlexWrapper)`
  flex-direction: column;
  > div {
    margin-left: 0 !important;
  }
  > div:not(:first-child) {
    margin-top: 10px;
  }
`;

interface OwnProps {
  id: string;
  board: string;
}

interface StateProps {
  list?: List;
  cards: CardsByListState;
  lists: List[];
}

interface DispatchProps {
  fetchCardsByListId: (id: string) => void
}
 
type Props = StateProps & DispatchProps & OwnProps;

class ListComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.fetchCardsByListId(this.props.id);
  }

  render() {
    const {
      board,
      list,
      cards,
      lists
    } = this.props;

    if(list) {
      return (
        <>
          <div key={list._id}>
            <h2>{list.name}</h2>
            <Description>{list.description}</Description>
            <TomatoButton width="100%">
              <Link className="create" to={`/board/${board}/list/${list._id}/card/create`}>Create new card</Link>
            </TomatoButton>
            <ListFlexWrapper>
              {cards && !cards.loading ? cards.cards.map((card: CardModel) => {
                const id = card._id as string;

                return (
                  <Container key={card._id}>
                    <Card list={card.list} id={id} lists={lists}></Card>
                  </Container>
                )
              }) : <p>Loading cards...</p>}
            </ListFlexWrapper>
          </div>
        </>
      );
    }

    return (
      <>
        <p>Loading list...</p>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { 
    lists,
    cards
  } = state;

  return { 
    list: lists.lists.find(list => list._id === ownProps.id),
    cards: cards.cards[ownProps.id],
    lists: lists.lists.filter(list => list.board === ownProps.board)
  };
}

const dispatchToProps = {
  fetchCardsByListId: CardsActions.fetchCardsByListId
};

export default connect(mapStateToProps, dispatchToProps)(ListComponent)