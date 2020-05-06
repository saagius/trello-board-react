import React from "react";
import { connect } from "react-redux";
import {RouteComponentProps, withRouter, Link} from "react-router-dom";
import * as ListsActions from "../reducers/lists/actions";
import { List } from "../model/List";
import {
  TitleWrapper,
  Title,
  Form
} from "../styles";

type RouteParams =  { boardId: string };

interface OwnProps {
  list: List;
}

interface DispatchProps {
  createList: (boardId: string, list: List) => void
}
 
type Props = DispatchProps & OwnProps & RouteComponentProps<RouteParams>;

class CreateListComponent extends React.Component<Props, OwnProps> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: {
        board: props.match.params.boardId,
        name: '',
        description: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<any>) {
    this.setState({
      list: {
        ...this.state.list,
        [event.target.id]: event.target.value
      }
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.props.createList(this.props.match.params.boardId, this.state.list);
    setTimeout(() => {
      this.props.history.push(`/board/${this.props.match.params.boardId}`);
    }, 1000);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <TitleWrapper>
          <Title>Create List</Title>
          <Link to={`/board/${this.props.match.params.boardId}`}>Back</Link>
        </TitleWrapper>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" id="name" value={this.state.list.name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea id="description" value={this.state.list.description} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </Form>
      </>
    );
  }
}

const dispatchToProps = {
  createList: ListsActions.createList
};

export default connect(null, dispatchToProps)(withRouter(CreateListComponent))