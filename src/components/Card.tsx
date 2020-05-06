import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { RootState } from "../reducers/store";
import { List } from "../model/List";
import { Card } from "../model/Card";
import * as CardsActions from "../reducers/cards/actions";

const ListsWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  background: #00000099;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  i {
    color: white;
    font-size: 25px;
  }
`;

const Actions = styled.div`
  position: absolute;
  right: 0;
  > a {
    color: black;
  }
`;

const ActionText = styled.div`
  color: white;
`;

const ActionIcon = styled.i`
  margin: 0;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 5px;
  }
`;

const CardWrapper = styled.div`
  position: relative;
`;

const CardTitle = styled.p`
  font-size: 18px;
`;

const CardDescription = styled.p`
  font-size: 12px;
`;

type RouteParams =  { boardId: string };

interface OwnProps {
  id: string;
  list: string;
  lists: List[];
}

interface InternalStateProps {
  selectedNewList: string;
  showListsDropdown: boolean;
  showDeleteConfirm: boolean;
}

interface StateProps {
  card: Card;
}

interface DispatchProps {
  moveCardToList: (newListId: string, card: Card) => void,
  deleteCard: (list: string, id: string) => void
}
 
type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps<RouteParams>;

class CardComponent extends React.Component<Props, InternalStateProps> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedNewList: props.list,
      showListsDropdown: false,
      showDeleteConfirm: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.showConfirmDelete = this.showConfirmDelete.bind(this);
    this.hideConfirmDelete = this.hideConfirmDelete.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({selectedNewList: event.target.value});
  }

  showDropdown() {
    this.setState({
      showListsDropdown: true
    });
  }

  hideDropdown() {
    this.setState({
      showListsDropdown: false
    });
  }

  showConfirmDelete() {
    this.setState({
      showDeleteConfirm: true
    });
  }

  hideConfirmDelete() {
    this.setState({
      showDeleteConfirm: false
    });
  }

  moveCard() {
    this.props.moveCardToList(this.state.selectedNewList, this.props.card);
  }

  deleteCard() {
    this.props.deleteCard(this.props.list, this.props.id);
  }

  render() {
    const {
      list,
      lists,
      card,
      match: {
        params: {
          boardId
        }
      }
    } = this.props;

    if(card) {
      return (
        <>
          {
            this.state.showListsDropdown ? 
            <ListsWrapper>
              <select value={this.state.selectedNewList} onChange={this.handleChange}>
                {
                  lists.map(list => <option key={list._id} value={list._id}>{list.name}</option>)
                }
              </select>
              <ActionIcon onClick={this.moveCard} title="Move" className="fa fa-floppy-o"></ActionIcon>
              <ActionIcon onClick={this.hideDropdown} title="Cancel" className="fa fa-times-rectangle"></ActionIcon>
            </ListsWrapper> : null
          }
          {
            this.state.showDeleteConfirm ? 
            <ListsWrapper>
              <ActionText>Confirm Deletion?</ActionText>
              <ActionIcon onClick={this.deleteCard} title="Delete" className="fa fa-trash-o"></ActionIcon>
              <ActionIcon onClick={this.hideConfirmDelete} title="Cancel" className="fa fa-times-rectangle"></ActionIcon>
            </ListsWrapper> : null
          }
          <CardWrapper>
            <Actions>
              <Link to={`/board/${boardId}/list/${list}/card/${card._id}`}>
                <ActionIcon title="Edit" className="fa fa-pencil-square-o"></ActionIcon>
              </Link>
              <ActionIcon onClick={this.showDropdown} title="Move" className="fa fa-arrows-alt"></ActionIcon>
              <ActionIcon onClick={this.showConfirmDelete} title="Delete" className="fa fa-trash-o"></ActionIcon>
            </Actions>
            <CardTitle>{card.name}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardWrapper>
        </>
      );
    }

    return (
      <>
        <p>Loading card...</p>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { 
    cards
  } = state;

  return { 
    card: cards.cards[ownProps.list].cards.find(card => card._id === ownProps.id) as Card
  };
}

const dispatchToProps = {
  moveCardToList: CardsActions.moveCardToList,
  deleteCard: CardsActions.deleteCard
};

export default connect(mapStateToProps, dispatchToProps)(withRouter(CardComponent))