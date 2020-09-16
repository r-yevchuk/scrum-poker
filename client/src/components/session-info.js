import * as React from "react";
import Api from "../services/api";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import UserTable from "./table";

class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        id: "?",
        name: "Loading...",
        users: {},
      },
    }
    this.getSession(this.props.sessionId)
  }

  getSession(id) {
    Api.get('session/' + id)
      .then((response) => {
        if (response.error !== null) {
          return;
        }
        this.setState({session: response.data});
        this.props.onGetSession(response.data);
      });
  }

  render() {
    const {session} = this.state;

    let users = Object.values(session['users']);
    let isNeedToSplit = users.length > 5;

    let others, half_length;
    if (isNeedToSplit) {
      half_length = Math.ceil(users.length / 2);
      others = users.splice(half_length, users.length)
      users = users.splice(0, half_length);
    }

    return (
      <Container fluid>
        <Container fluid>
          <h5 className="mt-4 mb-2 text-center">Session name: {session.name},
            <Link
              to="#"
              className="ml-2"
              onClick={() => {
                navigator.clipboard.writeText(this.state.session.id);
              }}>
              id: {session.id}
            </Link>
          </h5>
        </Container>

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
                startIndex={half_length + 1}
              />
            </span>}
          </Row>
        </Container>

      </Container>
    )
  }
}

export default SessionInfo;

