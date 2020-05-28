import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {Button, ButtonToolbar, Dropdown} from "react-bootstrap";
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
      <Container fluid>
        <h2 className="mt-4 text-xl-center">Create a new room</h2>
        <Row>
          <Form className="mt-lg-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Cards</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1"></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <ButtonToolbar>
            <Button
              onClick={() => this.onSelectAllCards()}
            >{isAllCardsActive ? "Unselect all" : "Select all"}</Button>
          </ButtonToolbar>
        </Row>
        <Row>
          {cardSet.map((cards) => (
            <Card value={cards} active={isAllCardsActive}/>
          ))}
        </Row>
      </Container>
    )
  }
}

export default NewRoom;
