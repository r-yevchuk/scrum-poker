import React from "react";
import Container from "react-bootstrap/Container";
import SessionInfo from "../components/session-info";


class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: { cards: ''},
    }
  }

  handleSession(session){
    this.setState({session: session})
  }

  render() {
    return (
      <Container fluid>
        <SessionInfo sessionId={this.props.match.params.sessionId} onGetSession={(e) => this.handleSession(e)} />
      </Container>
    )
  }
}

export default Room;
