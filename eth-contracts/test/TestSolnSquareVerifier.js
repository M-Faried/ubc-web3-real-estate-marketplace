// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require('SquareVerifier');
const proof_1 = require('../../zokrates/code/square/proof_1.json');
const proof_2 = require('../../zokrates/code/square/proof_2.json');

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

contract('SolnSquareVerifier', accounts => {

    const config = {
        owner: accounts[0],
        testAccounts: accounts.slice(1),
    };

    describe('(SolnSquareVerifier) Main Behavior', async function () {

        before(async function () {
            this.contract = await SolnSquareVerifier.new(SquareVerifier.address, { from: config.owner });
        })

        it('Adds new solution for contract', async function () {
            let tokenId = idGenerator.generate();

            let beforeSupply = await this.contract.totalSupply();
            let minted = await this.contract.mintNFT(
                config.owner,
                tokenId,
                proof_1.proof.a,
                proof_1.proof.b,
                proof_1.proof.c,
                proof_1.inputs);
            let afterSupply = await this.contract.totalSupply();

            assert(minted, true, "The token wasn't minted successfully");
            assert(beforeSupply, 0, "Incorrect number of before tokens");
            assert(afterSupply, 1, "Incorrect number of before tokens");
        })

        it('Minting another NFT token', async function () {
            let tokenId = idGenerator.generate();

            let beforeSupply = await this.contract.totalSupply();
            let minted = await this.contract.mintNFT(
                config.owner,
                tokenId,
                proof_2.proof.a,
                proof_2.proof.b,
                proof_2.proof.c,
                proof_2.inputs);
            let afterSupply = await this.contract.totalSupply();

            assert(minted, true, "The token wasn't minted successfully");
            assert(beforeSupply, 1, "Incorrect number of before tokens");
            assert(afterSupply, 2, "Incorrect number of before tokens");
        })
    })
});