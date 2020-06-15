import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import First from './First';
import Second from './Second';

class Header extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link className="link" to="/">First Tab</Link>
                            <Link className="link" to="/second">Second Tab</Link>
                        </Nav>
                    </Navbar>

                    <Route exact path="/">
                        <First />
                    </Route>
                    <Route path="/second">
                        <Second />
                    </Route>
                </Router>
            </div>
        )
    }
}

export default Header;