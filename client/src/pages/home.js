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
        id: '', name: '', password: '', connect: ''
      },
      user: {
        id: '', name: '', password: '', session: {id: ''}
      },
      isPrivateSession: false,
    }
  }

  handleChange(event) {
    const {name, value} = event.target;
    const {errors} = this.state;

    switch (name) {
      case 'id':
        errors.id = value === '' ? 'Id cannot be empty! ' : '';
        errors.id += !Number.isInteger(+value) ? 'Wrong id format! Must be positive integer number! ' : '';
        errors.id += value < 0 ? 'Cannot be negative number ' : '';
        this.setState({isPrivateSession: false})
        break;
      case 'name':
        errors.name = value.length < 1 ? 'The user name cannot be empty! ' : '';
        break;
      default:
        break;
    }

    errors.password = '';
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
    this.formValidation();
  }

  formValidation() {
    const {user, errors} = this.state;
    if (user.id === '') {
      errors.id = 'Id cannot be empty! '
      this.setState({errors});
      return;
    }

    if (user.name === '') {
      errors.name = 'User name cannot be empty! '
      this.setState({errors});
      return;
    }
    this.getSession(user, errors);
  }

  getSession(user, errors) {
    if (user.id !== undefined && user.id > 0 && Number.isInteger(+user.id)) { // '+' convert from string to number
      Api.get('session/' + user.id)
        .then((response) => {
          if (response.error !== null) {
            errors.connect = 'Connection error! Try again later! '
            this.setState({errors});
            return;
          }
          if (response.status === 204) {
            errors.id = 'Session with such id doesn\'t exist! '
            this.setState({errors});
          } else {
            let password = response.data.password;
            this.checkPassword(user, password, errors)
          }
        });
    }
  }

  checkPassword(user, password, errors) {
    if (this.state.isPrivateSession) {
      if (user.password.length > 0) {
        if (user.password === password) {
          this.createUser(user);
        } else {
          errors.password = 'Wrong password! '
          this.setState({errors});
        }
      } else {
        errors.password = 'This is private session! '
        this.setState({errors});
      }
      return;
    }

    if (password) {
      this.setState({isPrivateSession: true})
    } else {
      this.createUser(user);
    }
  }

  createUser(user) {
    user.session.id = user.id;
    user.id = '';
    Api.post('user', user)
      .then((response) => {
        if (response.error) {
          return;
        }
        this.props.history.push('/client/' + user.session.id);
      });
  }

  render() {
    const {errors, isPrivateSession} = this.state;

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
              // Prevent enter 'e' symbol
              onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
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

            {isPrivateSession &&
            <Input
              label="Password"
              placeholder="Please enter password"
              name="password"
              type="text"
              isInvalid={errors.password.length > 0}
              onChange={(e) => this.handleChange(e)}
              errors={errors.password}
            />}

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
