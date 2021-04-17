import web3 from './web3';
// import { abi } from './abi/okusuri.json';

// const address = "0xa5cd4cf23137e6cc7586b009d7e5d93a7111f7b4";
 // const address = "0x66f2c92b553bb0f8aa3ad1ab1d32ee70db371532";
 const address = "0x1daede79d3bffa8e66c67620206408c2e8e0ee44";
const abi = require('./abi/okusuri.json');
export default new web3.eth.Contract(abi,address);
