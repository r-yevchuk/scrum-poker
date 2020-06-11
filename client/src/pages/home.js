import * as React from "react";
import '../styles/home.css'
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Input from "../components/input";
import Api from '../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        id: "",
        name: "",
      },
      sessionId: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { errors } = this.state;
    switch (name) {
      case 'id':
        errors.id = value.length < 1 ? 'Id cannot be empty! ' : '';
        break;
      case 'name':
        errors.name = value.length < 1 ? 'The user name cannot be empty! ' : '';
        break;
      default:
        break;
    }

    this.setState((prevState) => ({
      errors,
      user: {
        ...prevState.session,
        [name]: value,
      },
    }));
  }

  onJoinClick() {
    // this.checkIfSessionExist()
  }

  render() {
    const { errors } = this.state;
    return (
        <Container>
          <h1 className="text">Scrum poker online</h1>
          <Row className="p-5">
            <Form>
              <Input
                label="Id"
                placeholder="Session id"
                name="id"
                type="text"
                isInvalid={errors.id.length > 0}
                onChange={this.handleChange}
                errors={errors.id}
              />

              <Input
                label="Name"
                placeholder="Please enter your name"
                name="name"
                type="text"
                isInvalid={errors.name.length > 0}
                onChange={this.handleChange}
                errors={errors.name}
              />

              <Button
                className="btn-main mt-2"
                variant="outline-dark"
                size="lg"
                onClick={() => this.onJoinClick()}
              >Join</Button>

              <p className="separator">or</p>

              <Link to="/new-room">
                <Button className="btn-main" variant="outline-dark" size="lg">Create Room</Button>
              </Link>
            </Form>
          </Row>
        </Container>
    )
  }
}

export default Home;
