import * as React from "react";
import Container from "react-bootstrap/Container";
import '../styles/client.css'
import {cardSet} from "../const/config";
import Row from "react-bootstrap/Row";
import Card from "../components/card";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

class Client extends React.Component {

  showCards(cards, index, isAllCardsSelected) {
    return <Card key={cards} index={index} value={cards} active={isAllCardsSelected} handle={() => this.forceUpdate()}/>
  }

  render() {
    return (
      <Container fluid>
        <h5 className="mt-4 mb-2 text-center"> Session name: SDAFGFDSA, id: 9999</h5>

        <Container className="mt-2 text-center">
          Status:
          <Container className="status">
            You can vote!
          </Container>

          <Row className="cards-row mt-4">
            <Container fluid className="table-container">
              <h5 className="mt-2 text-center">Members:</h5>
              <Table className="table-members" striped bordered hover size="sm">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Estimation</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                </tbody>
              </Table>
            </Container>

            {cardSet.values.map((cards, index) =>
              this.showCards(cards, index, cardSet.selected[index]))}
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Client;