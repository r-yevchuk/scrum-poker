import * as React from "react";
import '../styles/home.css'
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        id: "",
        name: "",
      },
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

  render() {
    const { errors } = this.state;
    return (
        <Container>
          <h1 className="text">Scrum poker online</h1>
          <Row className="p-5">
            <Form>
              <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control
                  placeholder="Session id"
                  name="id"
                  size="lg"
                  type="text"
                  isInvalid={errors.id.length > 0}
                  onChange={this.handleChange}/>
                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Please enter your name"
                  name="name"
                  size="lg"
                  type="text"
                  isInvalid={errors.name.length > 0}
                  onChange={this.handleChange}/>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Link to="/client">
                <Button className="btn-main mt-2" variant="outline-dark" size="lg">Join</Button>
              </Link>

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
