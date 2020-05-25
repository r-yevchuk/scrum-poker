import * as React from "react";
import '../styles/home.css'
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class Home extends React.Component{

    render() {
        return (
            <div>
                <Container>
                    <h1 className="text">Scrum poker online</h1>
                    <Row>
                        <Form className="mt-lg-5">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Id</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Session id" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Name</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Please enter your name" />
                            </Form.Group>

                            <Button
                                className="btn-main mt-2"
                                variant="outline-dark"
                                size="lg">Join</Button>

                            <p className="separator">or</p>

                            <Button
                                className="btn-main"
                                variant="outline-dark"
                                size="lg">Create Room</Button>
                        </Form>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;