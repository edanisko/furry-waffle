import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {  Navbar } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    async componentDidMount() {

    }


    render() {
        const childProps = {};

        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">MLB Games</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                </Navbar>
                <Routes childProps={childProps} />
            </div>
    );
    }


}

export default withRouter(App);