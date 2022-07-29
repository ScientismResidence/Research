const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

const CONTRACT_INITIAL_MESSAGE = 'He there!';
const CONTRACT_UPDATED_MESSAGE = 'Updated message!';

beforeEach(async () => {
    // Get a list of all predefined accounts;
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [CONTRACT_INITIAL_MESSAGE]})
        .send({ from: accounts[0], gas: 1000000 });
});

describe('Inbox', () => {
    it('Contract is deployed', () => {
        assert.ok(inbox.options.address);
    });

    it('Has a default message', async() => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, CONTRACT_INITIAL_MESSAGE);
    });

    it('Is setMessage() updates the message', async() => {
        await inbox.methods.setMessage(CONTRACT_UPDATED_MESSAGE)
            .send({from: accounts[0], gas: 1000000 });
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, CONTRACT_UPDATED_MESSAGE);
    });
});