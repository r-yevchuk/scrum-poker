import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./pages/home";
import Switch from "react-bootstrap/cjs/Switch";
import NewRoom from "./pages/new-room";

class App extends React.Component {
    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/new-room" component={NewRoom} />
            </Switch>
        </Router>
    )
  }
}

export default App;
