import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';
import jsQR from 'jsqr';


class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div>新しいお薬を登録する</div>
        <div>登録する</div>
      </div>
    );
  }

}

export default App;
