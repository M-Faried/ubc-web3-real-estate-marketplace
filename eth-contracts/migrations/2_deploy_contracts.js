// // migrating the appropriate contracts
var Oraclize = artifacts.require("../contracts/Oraclize.sol");
var ERC721Mintable = artifacts.require("../contracts/ERC721Mintable.sol");
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function (deployer) {
  deployer.deploy(Oraclize);
  deployer.deploy(ERC721Mintable);
  deployer.deploy(SquareVerifier);
  // deployer.deploy(SolnSquareVerifier);
};
