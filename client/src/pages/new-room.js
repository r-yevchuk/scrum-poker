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
import Input from "../components/input";


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
        cards: "",
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
    this.setState({isShowError: true})

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
    errors.cards = ''
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
    return <Card key={cards} index={index} value={cards} active={isAllCardsSelected} handle={() => this.forceUpdate()}/>
  }

  updateSelectedCards(){
    const { errors } = this.state;
      this.selectedCards = []
      let cardsQuantity = 0;

      cardSet.selected
        .filter(value => value === true)
        // eslint-disable-next-line array-callback-return
        .map((value, index) => {
          this.selectedCards += (cardSet.values[index]) + ' ';
          cardsQuantity ++;
      })
      if (cardsQuantity < 3){
        errors.cards = "error";
      } else {
        errors.cards = "";
      }
  }

  render() {
    let {isAllCardsSelected, isPrivateSession, errors, isShowError} = this.state;
    this.updateSelectedCards();
    return (
      <Container>
        <h3 className="mt-3 text-xl-center">Create a new room</h3>

        <Row>
          <Form id="form" className="mt-lg-1">
            <Input
              label="Name"
              placeholder="Session name"
              name="name"
              type="text"
              isInvalid={isShowError && errors.name.length > 0}
              isValid={errors.name === ''}
              onChange={this.handleChange}
              errors={errors.name}
            />

            <Form.Group controlId="formCheckbox">
              <Form.Check onChange={() => this.reverseBoolState('isPrivateSession')}
                          className="custom-checkbox"
                          type="switch"
                          label="Private session" />
            </Form.Group>

            {isPrivateSession && (
              <Input
                label="Password"
                placeholder="Session password"
                name="password"
                type="password"
                isInvalid={errors.password.length > 0}
                onChange={this.handleChange}
                errors={errors.password} />
            )}

            {errors.cards.length > 0 && <small className="text-error">You must select at least 3 cards</small>}
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
