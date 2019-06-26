import web3 from './web3';
// import { abi } from './abi/okusuri.json';

const address = "0xa5cd4cf23137e6cc7586b009d7e5d93a7111f7b4";
const abi = require('./abi/okusuri.json');
export default new web3.eth.Contract(abi,address);
