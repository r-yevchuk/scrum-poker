import * as React from "react";
import Table from "react-bootstrap/Table";

class UserTable extends React.Component{

  render() {
    const {users, startIndex} = this.props;
    return (
      <Table className="table-members" striped bordered hover size="sm">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Estimation</th>
        </tr>
        </thead>

        <tbody>
        {users.map((value, index) => {
          return (
            <tr>
              <td>{startIndex + index}</td>
              <td>{value.name}</td>
              <td>?</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }
}

export default UserTable;

