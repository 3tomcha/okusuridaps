import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';
import jsQR from 'jsqr';
import List from './List';
import { Link, Route } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Connect from './Connect';


class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
      <Navbar className="bg-light justify-content-between" bg="primary" variant="dark">
      <Navbar.Brand href="/">ずっと使えるお薬手帳</Navbar.Brand>
      <Nav className="m-0">
      <Nav.Link href="/connect" className="text-white">＋</Nav.Link>
      </Nav>
      </Navbar>
      <Route exact path="/" component={List}/>
      <Route exact path="/connect" component={Connect}/>
      </div>
    );
  }

}

export default App;
