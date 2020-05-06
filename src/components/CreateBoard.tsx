import React from "react";
import { connect } from "react-redux";
import {RouteComponentProps, withRouter, Link} from "react-router-dom";
import * as BoardsActions from "../reducers/boards/actions";
import { Board } from "../model/Board";
import {
  TitleWrapper,
  Title,
  Form
} from "../styles";

interface OwnProps {
  board: Board;
}

interface DispatchProps {
  createBoard: (board: Board) => void
}
 
type Props = DispatchProps & RouteComponentProps;

class CreateBoardComponent extends React.Component<Props, OwnProps> {
  constructor(props: Props) {
    super(props);
    this.state = {
      board: {
        name: '',
        description: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<any>) {
    this.setState({
      board: {
        ...this.state.board,
        [event.target.id]: event.target.value
      }
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.props.createBoard(this.state.board);
    setTimeout(() => {
      this.props.history.push('/boards');
    }, 1000);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <TitleWrapper>
          <Title>Create Board</Title>
          <Link to={`/boards`}>Back</Link>
        </TitleWrapper>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" id="name" value={this.state.board.name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea id="description" value={this.state.board.description} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </Form>
      </>
    );
  }
}

const dispatchToProps = {
  createBoard: BoardsActions.createBoard
};

export default connect(null, dispatchToProps)(withRouter(CreateBoardComponent))