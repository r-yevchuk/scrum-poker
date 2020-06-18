import * as React from "react";
import '../styles/home.css'
import '../styles/alert.css'
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Input from "../components/input";
import Api from '../services/api';
import Alert from "react-bootstrap/Alert";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        id: '', name: '', connect: ''
      },
      user: {
        id: '',
        name: '',
      },
      session: {},
    }
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

    errors.connect = '';
    this.setState((prevState) => ({
      errors,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  }

  onJoinClick() {
    this.getSession()
  }

  getSession() {
    const { user, errors } = this.state;

    if (user.id !== undefined && user.id > 0 &&  Number.isInteger(+user.id)) { // '+' convert from string to number
      Api.get('session/' + user.id)
        .then((response) => {
          if (response.errors !== null){
            errors.connect = 'Connection error! Try again later! '
            this.setState({errors});
            return;
          }
          if (response.status === 204) {
            errors.id = 'Session with such id does not exist! '
            this.setState({errors});
            return;
          }
          this.setState({
            session: response.data,
          });
        });
    } else {
      errors.id = 'Wrong id format! Must be positive integer number! '
      this.setState({errors});
    }
  }

  render() {
    const { errors } = this.state;

    return (
        <Container>
          {errors.connect.length > 0 && <Alert className="alert" variant="danger">{errors.connect}</Alert>}
          <h1 className="text">Scrum poker online</h1>
          <Row className="p-5">
            <Form>
              <Input
                label="Id"
                placeholder="Session id"
                name="id"
                type="number"
                isInvalid={errors.id.length > 0}
                onChange={(e) => this.handleChange(e)}
                errors={errors.id}
              />

              <Input
                label="Name"
                placeholder="Please enter your name"
                name="name"
                type="text"
                isInvalid={errors.name.length > 0}
                onChange={(e) => this.handleChange(e)}
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
