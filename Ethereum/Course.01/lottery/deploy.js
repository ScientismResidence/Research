const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'little problem rule please seed charge face accident staff obtain sweet volume',
    'https://rinkeby.infura.io/v3/3bc72acb6ee842ec802da039243e9af6'
);
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy the contract from account:', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: 1000000 });
    console.log('Contract deployed to:', result.options.address);
};
deploy();