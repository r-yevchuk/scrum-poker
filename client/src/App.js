import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./pages/home";
import Switch from "react-bootstrap/cjs/Switch";

class App extends React.Component {
    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    )
  }
}

export default App;
