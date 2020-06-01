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
      session: {},
      isAllCardsSelected: true,
      isPrivateSession: false,
      errors: {
        name: "The name cannot be empty! ",
        password: "",
      },
      isShowError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectedCards = []
  }

  reverseBoolState(variable){
    this.setState((currentState) => ({[variable]: !currentState[variable]}));
  }

  onSelectAllClick(){
    this.setState((currentState) => ({isAllCardsSelected: !currentState.isAllCardsSelected}));
    cardSet.selected.fill(this.state.isAllCardsSelected)
    this.forceUpdate()
  }

  componentDidMount() {
    this.onSelectAllClick()
  }

  onCreateClick() {
    const { session, errors } = this.state;
    this.selectedCards = []
    this.setState({isShowError: true})
    cardSet.selected.map((value, index) => {
      if (value === true) {
        this.selectedCards += (cardSet.values[index]) + ' ';
      }
    })

    if (this.validateForm(errors)) {
      this.sendData('session', session);
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => { if (val.length > 0) valid = false; },
    );
    return valid;
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { errors } = this.state;
    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'The name cannot be empty! ' : '';
        break;
      case 'password':
        errors.password = value.length > 8 && value.length <= 40 ?
          '' : 'Password must be 8-40 characters! ';
        break;
      default:
        break;
    }

    this.setState((prevState) => ({
      errors,
      session: {
        ...prevState.session,
        [name]: value,
      },
    }));
  }

  sendData(path, data) {
    data.cards = this.selectedCards
    Api.post(path, data)
      .then((response) => {
        if (response.error) {
          return;
        }
        this.props.history.push('/session');
      });
  }

  showCards(cards, index, isAllCardsSelected){
    return <Card key={cards} index={index} value={cards} active={isAllCardsSelected}/>
  }

  render() {
    let {isAllCardsSelected, isPrivateSession, errors, isShowError} = this.state;
    return (
      <Container>
        <h3 className="mt-3 text-xl-center">Create a new room</h3>

        <Row>
          <Form id="form" className="mt-lg-1">
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Session name"
                name="name"
                size="lg"
                type="text"
                required
                isInvalid={isShowError && errors.name.length > 0}
                isValid={errors.name === ''}
                onChange={this.handleChange}/>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
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
                  isInvalid={errors.password.length > 0}
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <h5 className="mt-2 text-xl-center">Cards: </h5>
          </Form>
        </Row>

        <Row>
          <ButtonToolbar>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => this.onSelectAllClick()}
            >{!isAllCardsSelected ? "Unselect all" : "Select all"}</Button>
          </ButtonToolbar>
        </Row>

        <Row className="cards-row">
          {cardSet.values.map((cards, index) =>
            this.showCards(cards, index, cardSet.selected[index]))}
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
