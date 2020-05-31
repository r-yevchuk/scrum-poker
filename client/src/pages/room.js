import React from "react";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: 0
    };
  }

  render() {
    return (
      <Container>
        <h4 className="mt-2">Session Id: {this.state.sessionId}
          <Link
            to="#"
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(this.state.sessionId)
            }}>Copy</Link>
        </h4>
      </Container>
    )
  }
}

export default Room;
