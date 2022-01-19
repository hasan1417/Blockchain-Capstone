var ERC721MintableComplete = artifacts.require('DarkIslandToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];


    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i = 2; i < 5; i ++) {
                await this.contract.mint(accounts[i], i, {from: account_one});
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            console.log(totalSupply)
            assert.equal(totalSupply, 3, "total supply is not 3");
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(accounts[2]);
            console.log(tokenBalance)
            assert.equal(tokenBalance, 1, "token balance is not 1");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(2,{from:account_one});
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(accounts[2], accounts[8], 2, {from: accounts[2]});
            var balance = await this.contract.balanceOf(accounts[8]);
            assert.equal(balance, 1, "Account #3 should hold 1 token of DarkIsland");

            var ownerOfToken = await this.contract.ownerOf(2);
            assert.equal(ownerOfToken, accounts[8], "Account #3 is the owner of the DarkIsland Token");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let fail = false
            try{
                await this.contract.mint(accounts[2], 1, {from: accounts[2]});
            }catch(error){
                fail = true;
            }

            assert.equal(fail, true, "Minting should fail when address is not contract owner");
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.getOwner();
            assert.equal(contractOwner, account_one, "Contract owner is not account_one");
        })

    });
})