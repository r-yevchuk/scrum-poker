import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/home";
import NewRoom from "./pages/new-room";
import Room from "./pages/room";
import Client from "./pages/client";
import NotFound from "./pages/404";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
      }
    }

  handleUser(user){
    this.setState({user: user});
  }

  render() {
    const {user} = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home onCreateUser={(e) => this.handleUser(e)} />}/>
          <Route exact path="/new-room" component={NewRoom}/>
          <Route exact path="/session/:sessionId" render={(props) => <Room {...props} />} />
          <Route exact path="/client/:sessionId" render={(props) => <Client user={user} {...props} />} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
