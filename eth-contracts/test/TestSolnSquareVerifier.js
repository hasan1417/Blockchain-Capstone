// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('verifier');
const proof = require('./proof.json')

contract('SolnSquareVerifier', accounts => {
    let contractOwner = accounts[0];

    describe('test the SolnSquareVerifier', function () {

        beforeEach(async function () {
            this.contract = await SolnSquareVerifier.deployed();
        })

        it('add a new solution', async function () {

            await this.contract.addSolution(accounts[1]);
            let solutionCount = await this.contract.getSolutionCount.call();
            assert.equal(solutionCount, 1, "Solution count should be 1");
        })

        it('can mint a token', async function () { 
            let accountOneBalance = await this.contract.balanceOf(accounts[1]);
            assert.equal(accountOneBalance, 0, "Account #1 should have 0 token");
            await this.contract.mintNewNFT(accounts[1],1,proof.proof,proof.inputs, {from: contractOwner});

            let tokenOwner = await this.contract.ownerOf(1,{from:contractOwner});

            assert.equal(tokenOwner, accounts[1], "Account #1 should own the token");
        })

    })
})
