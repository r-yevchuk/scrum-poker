import React from "react";
import '../styles/room.css'
import Container from "react-bootstrap/Container";
import SessionInfo from "../components/session-info";
import Input from "../components/input";
import {Button} from "react-bootstrap";


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

  handleChange(e){

  }

  render() {
    return (
      <Container fluid>
        <SessionInfo sessionId={this.props.match.params.sessionId} onGetSession={(e) => this.handleSession(e)} />
        <Container className="form">
        <Input
            label="Story:"
            placeholder="No Topic"
            name="topic"
            onChange={(e) => this.handleChange(e)}
          />
          <Input
            label="Description:"
            placeholder="Short description"
            name="description"
            onChange={(e) => this.handleChange(e)}
          />
          <Button
            variant="outline-dark"
            size="lg">Start</Button>
        </Container>
      </Container>
    )
  }
}

export default Room;
