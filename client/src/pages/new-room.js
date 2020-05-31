import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {Button, ButtonToolbar} from "react-bootstrap";
import '../styles/new-room.css'
import {cardSet} from '../const/config.js'
import Card from "../components/card";
import {Link, withRouter} from "react-router-dom";
import Api from '../services/api';


class NewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllCardsSelected: true,
      isPrivateSession: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  reverseBoolState(variable){
    this.setState((currentState) => ({[variable]: !currentState[variable]}));
  }

  onCreateClick() {
    const { session } = this.state;
    this.sendData('session', session);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      session: {
        ...prevState.session,
        [name]: value,
      },
    }));
  }

  sendData(path, data) {
    Api.post(path, data)
      .then((response) => {
        if (response.error) {
          return;
        }
        this.props.history.push('/session');
      });
  }

  render() {
    let {isAllCardsSelected, isPrivateSession} = this.state;

    return (
      <Container>
        <h3 className="mt-4 text-xl-center">Create a new room</h3>

        <Row>
          <Form className="mt-lg-1">
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Session name"
                name="name"
                size="lg"
                type="text"
                onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="formCheckbox">
              <Form.Check onChange={() => this.reverseBoolState('isPrivateSession')}
                          className="custom-checkbox"
                          type="switch"
                          label="Private session"  />
            </Form.Group>

            {isPrivateSession && (
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Session password"
                  name="password"
                  size="lg"
                  type="password"
                  onChange={this.handleChange} />
              </Form.Group>
            )}
            <h4 className="mt-4 text-xl-center">Cards: </h4>
          </Form>
        </Row>

        <Row>
          <ButtonToolbar>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => this.reverseBoolState('isAllCardsSelected')}
            >{isAllCardsSelected ? "Unselect all" : "Select all"}</Button>
          </ButtonToolbar>
        </Row>

        <Row className="cards-row">
          {cardSet.map((cards) => (
            <Card key={cards} value={cards} active={isAllCardsSelected}/>
          ))}
        </Row>

        <Row className="mb-3 mt-3">
          <Button
            className="mr-2"
            variant="outline-dark"
            size="lg"
            onClick={() => {this.onCreateClick()}}
          >Create</Button>
          <Link to="/">
            <Button variant="outline-dark" size="lg">Cancel</Button>
          </Link>
        </Row>

      </Container>
    )
  }
}

export default withRouter(NewRoom);
