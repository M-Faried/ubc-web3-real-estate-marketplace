pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

// TODO define a solutions struct that can hold an index & an address

// TODO define an array of the above struct

// TODO define a mapping to store unique solutions submitted

// TODO Create an event to emit when a solution is added

// TODO Create a function to add the solutions to the array and emit the event

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

contract IVerifier {
    //  function verifyTx(Proof memory proof, uint256[3] memory input)
    //     public
    //     view
    //     returns (bool r)
    function verifyTx(
        uint256[2] memory a,
        uint256[2] memory a_p,
        uint256[2][2] memory b,
        uint256[2] memory b_p,
        uint256[2] memory c,
        uint256[2] memory c_p,
        uint256[2] memory h,
        uint256[2] memory k,
        uint256[3] memory input
    ) public returns (bool r);
}

contract SolnSquareVerifier is ERC721Mintable {
    struct Solution {
        address owner;
        uint256 tokenId;
        bool exist;
    }

    IVerifier private _verifier;
    Solution[] private _solutions;
    mapping(bytes32 => Solution) private _solutionsMapping;

    event SolutionAdded(address owner, uint256 tokenId);

    constructor(address verifier) public {
        _verifier = IVerifier(verifier);
    }

    // function mintNFT(owner, tokenId, Proof memory proof, uint256[3] memory input) public returns(bool)
    function mintNFT(
        address owner,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2] memory a_p,
        uint256[2][2] memory b,
        uint256[2] memory b_p,
        uint256[2] memory c,
        uint256[2] memory c_p,
        uint256[2] memory h,
        uint256[2] memory k,
        uint256[3] memory input
    ) public returns (bool) {
        // Calculating the solution key.
        bytes32 key = _getKey(a, a_p, b, b_p, c, c_p, h, k, input);

        // Making sure the solution doesn't already exist
        require(!_solutionsMapping[key].exist, "Solution already exists");

        // Verifiying the proof and the input.
        bool verified = _verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);
        require(verified, "Unable to verify token.");

        // Minting the token
        mint(owner, tokenId);

        // Adding the token to the lists.
        _addSolution(key, owner, tokenId);

        // returns a true boolean upon completion of the function
        return true;
    }

    function _addSolution(
        bytes32 solutionKey,
        address owner,
        uint256 tokenId
    ) private {
        Solution memory sol = Solution({
            owner: owner,
            tokenId: tokenId,
            exist: true
        });

        // Adding the solution.
        _solutionsMapping[solutionKey] = sol;
        _solutions.push(sol);

        emit SolutionAdded(owner, tokenId);
    }

    // function _getKey(Proof memory proof, uint256[3] memory input);
    function _getKey(
        uint256[2] memory a,
        uint256[2] memory a_p,
        uint256[2][2] memory b,
        uint256[2] memory b_p,
        uint256[2] memory c,
        uint256[2] memory c_p,
        uint256[2] memory h,
        uint256[2] memory k,
        uint256[3] memory input
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
    }
}
