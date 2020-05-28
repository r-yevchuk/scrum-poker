import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {Button, ButtonToolbar, Dropdown, FormCheck} from "react-bootstrap";
import '../styles/new-room.css'
import {cardSet} from '../const/config.js'
import Card from "../components/card";


class NewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllCardsActive: true
    };
  }

  onSelectAllCards() {
    this.setState((currentState) => ({isAllCardsActive: !currentState.isAllCardsActive}));
  }

  render() {
    let {isAllCardsActive} = this.state;

    return (
      <Container>
        <h2 className="mt-4 text-xl-center">Create a new room</h2>
        <Row>
          <Form className="mt-lg-1">
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Session name"/>
            </Form.Group>

            <Form.Group controlId="formCheckbox">
              <Form.Check className="custom-checkbox" type="switch" label="Private session"  />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Session password"/>
            </Form.Group>

            <h3 className="mt-4 text-xl-center">Cards: </h3>

            {/*<Form.Group controlId="formBasicEmail">*/}
            {/*  <Form.Label>Cards</Form.Label>*/}
            {/*  <Dropdown>*/}
            {/*    <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
            {/*    </Dropdown.Toggle>*/}
            {/*    <Dropdown.Menu>*/}
            {/*      <Dropdown.Item href="#/action-1"></Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}
            {/*  </Dropdown>*/}
            {/*</Form.Group>*/}
          </Form>
        </Row>
        <Row>
          <ButtonToolbar>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => this.onSelectAllCards()}
            >{isAllCardsActive ? "Unselect all" : "Select all"}</Button>
          </ButtonToolbar>
        </Row>
        <Row className="cards-row">
          {cardSet.map((cards) => (
            <Card value={cards} active={isAllCardsActive}/>
          ))}
        </Row>
        <Row className="mb-2">
            <Button className="mr-2" variant="outline-dark" size="lg">Create</Button>
            <Button variant="outline-dark" size="lg">Cancel</Button>
        </Row>

      </Container>
    )
  }
}

export default NewRoom;
