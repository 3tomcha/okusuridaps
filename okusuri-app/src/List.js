import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';
import jsQR from 'jsqr';
import getkey from './key';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import { Link, Route } from "react-router-dom";
import { Navbar, Nav, Button, ButtonToolbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class List extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      okusuri : "",
      okusuri_image : "",
      byouin_name: "",
      yakkyoku_name: ""
    };
    this.setOkusuri = this.setOkusuri.bind(this);
  }

  componentDidMount(){
    this.setOkusuri();
  }

  render(){
    return (
      <div>
       <ButtonToolbar>
      <Button variant="light" className="menutitle" size="lg">お薬一覧</Button>
      </ButtonToolbar>
      <Card>
      <Card.Body>
      <Card.Img variant="top" src={this.state.okusuri_image}/>
      <Card.Title>{this.state.okusuri}</Card.Title>
      <Card.Text>{this.state.byouin_name}<br/>{this.state.yakkyoku_name}</Card.Text>
      </Card.Body>
      </Card>
      </div>
    );
  }

  async setOkusuri(){
    const okusuri1 = await okusuri.methods.getOkusuri().call();
    const byouin = await okusuri.methods.hospital().call();
    const yakkyoku = await okusuri.methods.department().call();


    if(okusuri1){
      const API_key = getkey().API_key;
      const cs_key = getkey().cs_key;

      let url = "https://www.googleapis.com/customsearch/v1?key="
      url += API_key;
      url += "&cx=";
      url += cs_key;
      url += "&searchType=image&q=";
      url += okusuri1;

      let response = await fetch(url);
      let json = await response.json();
      let image_url = await json.items[0].image.thumbnailLink;

      await this.setState({
        okusuri: okusuri1,
        okusuri_image: image_url,
        yakkyoku_name: yakkyoku,
        byouin_name: byouin
      });
    }
  }
}

export default List;
