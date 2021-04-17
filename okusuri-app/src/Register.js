import React from 'react';
import logo from './logo.svg';
import './App.css';
import okusuri from './okusuri';
import web3 from './web3';
import jsQR from 'jsqr';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


class Register extends React.Component{

  constructor(props){
    super(props);
    this.launchWebcam = this.launchWebcam.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.copyFrame = this.copyFrame.bind(this);

    this.state = {
      okusuri : "",
      okusuri_image : "",
      byouin_name: "",
      yakkyoku_name: ""
    };
  }

  render(){
    return (
      <div>
       <ButtonToolbar>
      <Button variant="light" className="menutitle" size="lg">お薬登録</Button>
      </ButtonToolbar>
      <Container>
      <Row>
      <Col>
      <Button variant="warning" size="lg" block onClick={this.launchWebcam}>①webカメラ起動</Button>
      </Col>
      <Col>
      <Button variant="warning" size="lg" block onClick={this.copyFrame}>②キャプチャ</Button></Col>
      </Row>
      <Row className="mt1">
      <Col md={{ span: 6, offset: 3 }}>
      <Button variant="warning" size="lg" block onClick={this.handleClick}>③登録する</Button>
      </Col>
      </Row>
      <Row>
      <canvas id="canvas" hidden className="w100 mt1"></canvas>
      <video className="w100 mt1">
      <source src="" type="video/webm"/>
      </video>
      <div id="output" hidden>
      <div id="outputMessage"></div>
      <div hidden><b>Data:</b> <span id="outputData"></span></div>
      </div>
      </Row>
      <Row className="mt1">
      <Col>
      <Button variant="info" size="lg" block onClick={this.getOkusuri}>（テスト用）お薬情報を得る</Button>
      </Col>
      </Row>
      </Container>
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
    // console.log(test);


    let csv = 'JAHISTC04,1¥n';
    csv += '1,小林　知弥,1,19870322,,,,,,0,コバヤシ　トモヤ¥n';
    csv += '2,1,花粉（H31.03.20）,1¥n';
    csv += '5,20190619,1¥n';
    csv += '11,薬局トモズ　西荻窪店,13,4,1557123,1670042,東京都杉並区西荻北3-19-1,03-5311-8321,1¥n';
    csv += '51,医療法人社団北辰会　西荻司ビルクリニック,13,1,1532068,1¥n';
    csv += '55,神田　裕,,1¥n';
    csv += '201,1,カロナール錠３００　３００ｍｇ,4,錠,4,1141007F2027,1¥n';
    csv += '291,1,飲食物）アルコール類,1¥n';
    csv += '301,1,１日２回朝・夕食後にお飲み下さい,5,日分,1,1,,1¥n';
    csv += '201,2,デキストロメトルファン臭化水素酸塩錠１５ｍｇ｢ＮＰ｣,6,錠,4,2223001F2137,1¥n';
    csv += '281,2,変更前：メジコン錠１５ｍｇ(6錠),1¥n';
    csv += '201,2,カルボシステイン錠５００ｍｇ｢サワイ｣,3,錠,4,2233002F2103,1¥n';
    csv += '281,2,変更前：ムコダイン錠５００ｍｇ(3錠),1¥n';
    csv += '301,2,１日３回　朝・昼・夕食後にお飲み下さい,5,日分,1,1,,1¥n';
    csv += '201,3,ツロブテロールテープ２ｍｇ｢ＨＭＴ｣,5,枚,4,2259707S3058,1¥n';
    csv += '281,3,変更前：ホクナリンテープ２ｍｇ(5枚),1¥n';
    csv += '301,3,貼り薬です,1,調剤,5,1,,1 ';

    console.log(csv.split('¥n'));

    var datas = csv.split('¥n');
    var name = "";
    var yakkyoku_name = "";
    var byouin_name = "";
    var okusuri_names = [];

    for ( let data of datas) {
      let imploded_data = data.split(",");
      switch (imploded_data[0]) {
        case "1":
        name = imploded_data[1];
        break;

        case "11":
        yakkyoku_name = imploded_data[1];
        break;

        case "51":
        byouin_name = imploded_data[1];
        break;


        case "201":
        okusuri_names.push(imploded_data[2]);
        break;
        default:

      }
    }

    // セッターの場合はアカウントを指定してあげる必要がある
    await okusuri.methods.setOkusuri(okusuri_names[0]).send({
      from: accounts[0]
    });
    await okusuri.methods.setHospital(byouin_name).send({
      from: accounts[0]
    });
    await console.log(byouin_name);
    await okusuri.methods.setDepartment(yakkyoku_name).send({
      from: accounts[0]
    });
    await console.log(yakkyoku_name);
  }

  async getOkusuri(){
    const okusuri1 = await okusuri.methods.okusuri(0).call();
    await console.log(okusuri1);

    const byouin = await okusuri.methods.hospital().call();
    await console.log(byouin);

    const yakkyoku = await okusuri.methods.department().call();
    await console.log(yakkyoku);
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

export default Register;
