const ERC721Mintable = artifacts.require('ERC721Mintable');

const idGenerator = (function () {
    let seed = 0;
    return {
        generate: function () {
            return seed++;
        },
        latest: function () {
            return seed - 1;
        },
        reset: function () {
            seed = 0;
        }
    }
})();

contract('TestERC721Mintable', accounts => {

    const config = {
        owner: accounts[0],
        testAccounts: accounts.slice(1),
    };

    describe('match erc721 spec', function () {
        before(async function () {
            this.contract = await ERC721Mintable.new({ from: config.owner });
            // TODO: mint multiple tokens
            idGenerator.reset();
            this.contract.mint(config.owner, idGenerator.generate(), { from: config.owner });
            this.contract.mint(config.owner, idGenerator.generate(), { from: config.owner });
            this.contract.mint(config.owner, idGenerator.generate(), { from: config.owner });
            this.contract.mint(config.owner, idGenerator.generate(), { from: config.owner });
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply();
            assert(totalSupply, 4, "Incorrect number of tokens");
        })

        it('should get token balance', async function () {
            let balanceOfOwner = await this.contract.balanceOf(config.owner);
            assert(balanceOfOwner, 4, "Incorrect number of tokens");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let uri = await this.contract.tokenURI(1);
            // console.log(">>>>>>> uri:", uri);
            assert(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Incorrect token uri");
        })

        it('should transfer token from one owner to another', async function () {

            let fromAccount = config.owner;
            let toAccount = config.testAccounts[0];

            // Making the transefer.
            await this.contract.transferFrom(fromAccount, toAccount, 1, { from: fromAccount });

            // Checking the state of the contract after the transfer.
            let fromBalance = await this.contract.balanceOf(fromAccount);
            let toBalance = await this.contract.balanceOf(toAccount);
            let currentOwner = await this.contract.ownerOf(1);

            assert(currentOwner, toAccount, "Incorrect token owner.");
            assert(fromBalance, 3, "The balance of the from account is not decremented");
            assert(toBalance, 1, "The balance of the to account is not incremented");
        })
    });

    describe('have ownership properties', function () {
        before(async function () {
            this.contract = await ERC721Mintable.new({ from: config.owner });
        })

        it('should fail when minting when address is not contract owner', async function () {
            let invalidAccount = config.testAccounts[0];
            let errorReported = false;

            try {
                await this.contract.mint(config.owner, idGenerator.generate(), { from: invalidAccount });
            } catch (e) {
                errorReported = true;
            }

            assert(errorReported, true, "Invalid token was minted");
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.getOwner();
            assert(config.owner, owner, "Invald owner was returned.");
        })

    });
})