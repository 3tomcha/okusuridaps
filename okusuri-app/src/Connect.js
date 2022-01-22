import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';
import jsQR from 'jsqr';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

class Connect extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    })

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

  render(){
    return (
    <div>connect</div>
    )
  }
}

export default Connect;
