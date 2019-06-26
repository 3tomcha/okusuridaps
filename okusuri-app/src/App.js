import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';
import jsQR from 'jsqr';


class App extends React.Component{

  constructor(props){
    super(props);
    this.launchWebcam = this.launchWebcam.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.copyFrame = this.copyFrame.bind(this);
  }

  render(){
    return (
      <div>
      <button onClick={this.handleClick}>aaaaa</button>
      <button onClick={this.launchWebcam}>QRコードから読み取る</button>
      <button onClick={this.copyFrame}>canvasにコピーする</button>
      <canvas id="canvas" hidden height="480" width="640"></canvas>
      <video height="480" width="640">
      <source src="" type="video/webm"/>
      </video>
      <div id="output" hidden>
      <div id="outputMessage">No QR code detected.</div>
      <div hidden><b>Data:</b> <span id="outputData"></span></div>
      </div>
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

    let csv = 'JAHISTC04,1'+'¥n'+
    '1,鈴木 太郎,1,S330303,,,,,,,'+'¥n'+
    '5,H280411,1'+'¥n'+
    '11,株式会社 工業会薬局 駅前店,13,4,1234567,,,'+'¥n'+
    ',1'+'¥n'+
    '51,医療法人 工業会病院,13,1,1234567,1'+'¥n'+
    '201,1,ｺﾘｵﾊﾟﾝｶﾌﾟｾﾙ5mg,4,Ｃ,2,620004992,1'+'¥n'+
    '201,1,ﾌｪﾛﾍﾞﾘﾝ配合錠,4,錠,2,620425801,1'+'¥n'+
    '301,1,【分２ 朝夕食後服用】,5,日分,1,1,,1'+'¥n'+
    '201,2,ｱﾄﾞｿﾙﾋﾞﾝ原末,1.5,g,2,620008284,1'+'¥n'+
    '201,2,ﾀﾝﾅﾙﾋﾞﾝ「ﾖｼﾀﾞ」,1.5,g,2,612370122,1'+'¥n'+
    '201,2,ﾚﾍﾞﾆﾝ散,2,g,2,620007148,1'+'¥n'+
    '301,2,【分３ 毎食後服用】,5,日分,1,1,,1';

    console.log(csv.split('¥n'));

    let datas = csv.split('¥n');
    var okusuri_names = [];

    for ( let data of datas) {
      let imploded_data = data.split(",");
      if(imploded_data[0]==201){
        // console.log("これはお薬１です");
        okusuri_names.push(imploded_data[2]);
      }
    }

    console.log(okusuri_names[0]);

    // for (okusuri_name of okusuri_names) {


    await okusuri.methods.setHospital(okusuri_names[0]).send({
      from: accounts[0]
    });
    // }
    const okusuri1 = await okusuri.methods.hospital().call();
    await console.log(okusuri1);
    setTimeout(()=>console.log(okusuri1),3);
  }

  launchWebcam(){
    let video = document.getElementsByTagName("video")[0];
    let canvasElement = document.getElementById("canvas");
    let canvas = canvasElement.getContext("2d");

    // // ビデオの仕様許可を求める
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(stream => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.load();
      video.play();
    });
  }

  drawLine(begin, end, color) {
    let canvasElement = document.getElementById("canvas");
    let canvas = canvasElement.getContext("2d");
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  // 動画から画面をキャプチャしてcanvasに描画する
  copyFrame(){
    let video = document.getElementsByTagName("video")[0];
    let canvasElement = document.getElementById("canvas");
    let canvas = canvasElement.getContext("2d");

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    canvasElement.hidden = false;

    let imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    let code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert"
    });

    console.log(code);

    if (code) {
      console.log(code.location.topLeftCorner);
      // QRコードがある位置に赤線を引く
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

        let outputContainer = document.getElementById("output");
        let outputMessage = document.getElementById("outputMessage");
        let outputData = document.getElementById("outputData");

        video.hidden = true;
        outputData.innerText = code.data;
        outputContainer.hidden = false;
        outputData.parentElement.hidden = false;
    }
  }

}

export default App;
