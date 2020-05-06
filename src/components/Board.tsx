import React from "react";
import { connect } from "react-redux";
import {
  Link,
  RouteComponentProps
} from "react-router-dom";
import { RootState } from "../reducers/store";
import * as BoardsActions from "../reducers/boards/actions";
import * as ListsActions from "../reducers/lists/actions";
import { Board } from "../model/Board";
import { List as ListModel } from "../model/List";
import List from "./List";
import {
  TitleWrapper,
  Title,
  Description,
  TomatoButton,
  FlexWrapper,
  Container
} from "../styles";

type RouteParams =  { boardId: string };

interface OwnProps extends RouteComponentProps<RouteParams> {

}

interface StateProps {
  board?: Board;
  lists: ListModel[];
}

interface DispatchProps {
  fetchBoardById: (id: string) => void,
  fetchListsByBoardId: (id: string) => void
}
 
type Props = StateProps & DispatchProps & OwnProps;

class BoardComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.fetchBoardById(this.props.match.params.boardId);
    this.props.fetchListsByBoardId(this.props.match.params.boardId);
  }

  render() {
    const {
      board,
      lists,
      match: {
        params: {
          boardId
        }
      }
    } = this.props;

    return (
      <>
        <TitleWrapper>
          <div>
            <Title>{board ? board.name : 'Loading Board information...'}</Title>
            <Description>{board ? board.description : ''}</Description>
          </div>
          <Link to={`/boards`}>Change board</Link>
        </TitleWrapper>
        <TomatoButton width="200px">
          <Link className="create" to={`/board/${boardId}/list/create`}>Create new list</Link>
        </TomatoButton>
        <FlexWrapper>
          {lists ? lists.map((list: any) => {
            return (
              <Container key={list._id} width="272px">
                <List id={list._id} board={boardId}></List>
              </Container>
            )
          }) : <p>Loading lists...</p>}
        </FlexWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  const { 
    boards,
    lists
  } = state;

  return { 
    board: boards.boards.find(board => board._id === ownProps.match.params.boardId),
    lists: lists.lists.filter(list => list.board === ownProps.match.params.boardId) || []
  };
}

const dispatchToProps = {
  fetchBoardById: BoardsActions.fetchBoardById,
  fetchListsByBoardId: ListsActions.fetchListsByBoardId
};

export default connect(mapStateToProps, dispatchToProps)(BoardComponent)