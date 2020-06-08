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
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/new-room" component={NewRoom}/>
          <Route exact path="/session" component={Room}/>
          <Route exact path="/client" component={Client}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
