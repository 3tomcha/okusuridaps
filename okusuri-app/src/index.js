import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Route } from "react-router-dom";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

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


ReactDOM.render(
  <Router>
      <App />
  </Router>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
