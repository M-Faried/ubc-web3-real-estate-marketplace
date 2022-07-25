// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
// const contract = artifacts.require("SquareVerifier");

// Test verification with correct proof

// - use the contents from proof.json generated from zokrates steps

// Test verification with incorrect proof

// const Web3 = require('web3');
// const abiFile = require('../build/contracts/SquareVerifier.json');
const SquareVerifier = artifacts.require('SquareVerifier')
const proof = require('../../zokrates/code/square/proof.json');

contract('Zokrates Verifier Tests', async (accounts) => {

    const config = {
        owner: accounts[0],
        testAccounts: accounts.slice(1),
    };

    before('setup contract', async () => {
        this.contract = await SquareVerifier.new({ from: config.owner });
    });

    it('verifies with correct proof', async () => {

        // Calculating the results using the generated proof.
        let result = await this.contract.verifyTx(proof.proof, proof.inputs, { from: config.owner });
        assert(result, true, 'The valid proof was not verified correctly.');
    });

    it('refuses to verify incorrect proof', async () => {

        // Tampering the proof.

        // Creating a copy of the original proof.
        let tamperedProof = { ...proof.proof };

        // Converting the A value to an array and chaning the value of the first element.
        let firstAvalue = Array.from(tamperedProof.a[0]);
        firstAvalue[2] = '5';

        // Resetting the first A value with the in correct data.
        tamperedProof.a[0] = firstAvalue.join('');

        // Checking the verification result.
        let errorReported = false
        try {
            // Calculating the result.
            await this.contract.verifyTx(tamperedProof, proof.inputs, { from: config.owner });
        }
        catch (e) {
            errorReported = true;
        }

        assert(errorReported, true, 'The invalid proof was verified incorrectly.');
    });

})