import * as React from "react";
import '../styles/user-table.css'
import Table from "react-bootstrap/Table";

class UserTable extends React.Component{

  onDeleteClick(){
    console.log("Delete");
  }

  render() {
    const {users, startIndex} = this.props;
    return (
      <Table className="table-members" bordered hover size="sm">
        <thead>
        <tr className="text-center">
          <th>#</th>
          <th>Name</th>
          <th>Estimation</th>
          <th>&#128465;</th>
        </tr>
        </thead>

        <tbody>
        {users.map((value, index) => {
          return (
            <tr key={value.id}>
              <td>{startIndex + index}</td>
              <td>{value.name}</td>
              <td>?</td>
              <td className="delete-user" onClick={this.onDeleteClick}>X</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }
}

export default UserTable;

