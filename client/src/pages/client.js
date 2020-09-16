import * as React from "react";
import Container from "react-bootstrap/Container";
import '../styles/client.css'
import Card from "../components/card";
import SessionInfo from "../components/session-info";
import Row from "react-bootstrap/Row";
import {cardSet} from "../const/config";

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: { cards: ''},
    }
  }

  showCards(cards, index, isAllCardsSelected) {
    return <Card key={cards} index={index} value={cards} active={isAllCardsSelected} handle={() => this.forceUpdate()}/>
  }

  handleSession(session){
    this.setState({session: session})
  }

  render() {
    const {session} = this.state;
    let allCards = session['cards'].toString().split(' ');

    return (
      <Container fluid>
        <SessionInfo sessionId={this.props.match.params.sessionId} onGetSession={(e) => this.handleSession(e)}/>

        <Container className="mt-2 text-center">
          Status:
          <Container className="status">
            You can vote!
          </Container>

          <Row className="cards-row mt-4">
            {allCards.map((cards, index) =>
              this.showCards(cards, index, cardSet.selected[index]))}
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Client;
