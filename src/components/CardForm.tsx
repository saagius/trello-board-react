import React from "react";
import { connect } from "react-redux";
import {RouteComponentProps, withRouter, Link} from "react-router-dom";
import * as CardsActions from "../reducers/cards/actions";
import { Card } from "../model/Card";
import {
  TitleWrapper,
  Title,
  Form
} from "../styles";
import { RootState } from "../reducers/store";

type RouteParams =  { boardId: string, listId: string, id: string; };

interface OwnProps {
  card: Card;
}

interface StateToProps extends OwnProps, RouteComponentProps<RouteParams> {

}

interface DispatchProps {
  createCard: (listId: string, card: Card) => void,
  updateCard: (listId: string, card: Card) => void
}

interface StateProps {
  card: Card;
}
 
type Props = DispatchProps & StateProps & RouteComponentProps<RouteParams>;

class CardFormComponent extends React.Component<Props, OwnProps> {
  constructor(props: Props) {
    super(props);
    this.state = {
      card: {
        list: props.match.params.listId,
        name: '',
        description: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      card,
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if(id !== 'create') {
      this.setState({
        card
      });
    }
  }

  handleChange(event: React.ChangeEvent<any>) {
    this.setState({
      card: {
        ...this.state.card,
        [event.target.id]: event.target.value
      }
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const {
      match: {
        params: {
          id,
          listId
        }
      }
    } = this.props;

    if(id === 'create') {
      this.props.createCard(listId, this.state.card);
    }
    else {
      this.props.updateCard(listId, this.state.card);
    }

    setTimeout(() => {
      this.props.history.push(`/board/${this.props.match.params.boardId}`);
    }, 1000);
    event.preventDefault();
  }

  render() {
    const {
      card,
      match: {
        params: {
          boardId,
          id
        }
      }
    } = this.props;

    return (
      <>
        <TitleWrapper>
          <Title>{id === 'Create' ? 'Create' : `Edit ${card ? card.name : ''}`} Card</Title>
          <Link to={`/board/${boardId}`}>Back</Link>
        </TitleWrapper>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" id="name" value={this.state.card.name} onChange={this.handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea id="description" value={this.state.card.description} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: StateToProps): StateProps => {
  const { 
    cards
  } = state;

  const {
    match: {
      params: {
        id,
        listId
      }
    }
  } = ownProps;

  return { 
    card: cards.cards[listId].cards.find(card => card._id === id) as Card
  };
}

const dispatchToProps = {
  createCard: CardsActions.createCard,
  updateCard: CardsActions.updateCard
};

export default connect(mapStateToProps, dispatchToProps)(withRouter(CardFormComponent))