const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());
let contract;
let accounts;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: 1000000 });
});

describe('Lottery contract', () => {
    it('Contract is deployed', () => {
        assert.ok(contract.options.address);
    });

    it('Allows to enter', async () => {
        await contract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.01', 'ether')
        });

        const players = await contract.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.strictEqual(1, players.length);
        assert.strictEqual(accounts[0], players[0]);
    });

    it('Allows enter to multiple accounts', async () => {
        await contract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.01', 'ether')
        });
        await contract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.01', 'ether')
        });
        await contract.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.01', 'ether')
        });

        const players = await contract.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.strictEqual(3, players.length);
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(accounts[1], players[1]);
        assert.strictEqual(accounts[2], players[2]);
    });

    it('Requires a minimum amount of ether to enter', async() => {
        try {
            await contract.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.009', 'ether')
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Only manager can call pickWinner', async() => {
        try {
            await contract.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Sends everything to the winner and resets the players', async() => {
        await contract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('1', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[1]);

        await contract.methods.pickWinner().send({
            from: accounts[0]
        });

        const winnerBalance = await web3.eth.getBalance(accounts[1]);
        const difference = winnerBalance - initialBalance;

        assert.strictEqual(difference, parseInt(web3.utils.toWei('1', 'ether')));
    });
});