import * as React from "react";
import Container from "react-bootstrap/Container";
import '../styles/client.css'
import {cardSet} from "../const/config";
import Row from "react-bootstrap/Row";
import Card from "../components/card";
import Api from "../services/api";
import UserTable from "../components/table";

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        id: "?",
        name: "Loading...",
        users: {}
      },

    }
    this.getSession(this.props.match.params.sessionId)
  }

  showCards(cards, index, isAllCardsSelected) {
    return <Card key={cards} index={index} value={cards} active={isAllCardsSelected} handle={() => this.forceUpdate()}/>
  }

  getSession(id) {
    Api.get('session/' + id)
      .then((response) => {
        if (response.error !== null) {
          return;
        }
        this.setState({session: response.data})
      });
  }

  render() {
    const {session} = this.state;

    let users = Object.values(session['users']);
    let isNeedToSplit = users.length > 5;

    let others;
    if (isNeedToSplit) {
      let half_length = Math.ceil(users.length / 2);
      others = users.splice(half_length, users.length)
      users = users.splice(0, half_length);
    }

    return (
      <Container fluid>
        <h5 className="mt-4 mb-2 text-center"> Session name: {session.name}, id: {session.id}</h5>

        <Container fluid>
          <h5 className="mt-2 text-center">Members:</h5>
          <Row>
            <span className="table-container">
              <UserTable
                users={users}
                startIndex={1}
              />
            </span>

            {isNeedToSplit &&
            <span className="table-container">
              <UserTable
                users={others}
                startIndex={5}
                />
            </span>}
          </Row>
        </Container>

        <Container className="mt-2 text-center">
          Status:
          <Container className="status">
            You can vote!
          </Container>

          <Row className="cards-row mt-4">
            {cardSet.values.map((cards, index) =>
              this.showCards(cards, index, cardSet.selected[index]))}
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Client;
