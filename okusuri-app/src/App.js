import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';


class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
      <button onClick={this.handleClick}>aaaaa</button>
      <button>QRコードから読み取る</button>
      </div>
    );
  }

  async componentDidMount(){
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // const manager = await okusuri.methods.manager().call();  //managar取得
  }

  handleClick = async () => {
    console.log("動きました");
    const accounts = await web3.eth.getAccounts();
    await okusuri.methods.setOkusuri("お薬1","説明").call();
    const okusuri1 = await okusuri.methods.getOkusuri().call();
    await console.log(okusuri1);
    setTimeout(()=>console.log(okusuri1),3);
  }

}

export default App;
