import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import { connector } from './web3';
import jsQR from 'jsqr';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class Connect extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    if(!connector.connected) {
        console.log(connector);
        connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
          throw error;
      }
      const { accounts, chainId } = payload.params[0]
      console.log(accounts)
      console.log(chainId)
    });
  }

  sendTransaction = () => {
    console.log("sendtransaction")
    const tx = {
      from: "0xa820ac47C5a5806b43981e2f7CAED1bFa67e63E9",
      to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
      data: "0x",
      gasPrice: "0x02540be400",
      gas: "0x9c40",
      value: "0x00",
      nonce: "0x0114",
    }

    connector.sendTransaction(tx).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.error(error);
    })
  }

  render(){
    return (
    <button onClick={this.sendTransaction()} >connect</button>
    )
  }
}

export default Connect;
