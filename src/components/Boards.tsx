import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../reducers/store";
import * as BoardsActions from "../reducers/boards/actions";
import { BoardState } from "../reducers/boards/types";
import { Board } from "../model/Board";
import {
  Title,
  TomatoButton,
  FlexWrapper,
  Container
} from "../styles";

interface StateProps {
  boards: BoardState;
}

interface DispatchProps {
  fetchBoards: () => void
}
 
type Props = StateProps & DispatchProps

class BoardsComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.fetchBoards();
  }

  render() {
    const {
      boards,
      loading
    } = this.props.boards;

    return (
      <>
        <Title>Trello Boards</Title>
        <TomatoButton width="200px">
          <Link className="create" to={'/board/create'}>Create new board</Link>
        </TomatoButton>
        <FlexWrapper>
        {
          loading ? <p>Loading...</p> : 
            boards ? boards.map((data: Board) => {
              return (
                <Container key={data._id}>
                  <Link to={`/board/${data._id}`}>{data.name}</Link>
                </Container>
              )
            }) : <p>Loading...</p>
        }
        </FlexWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { boards } = state;
  return { boards };
}

export default connect(mapStateToProps, BoardsActions)(BoardsComponent);