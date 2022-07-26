# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 


## Install

To install, download or clone the repo, then:

`npm install`

Make sure you already have truffle installed:

`npm install -g truffle`

##### Compile Contracts

cd into eth-contracts then

`truffle compile`

#### Launch Ganache with following settings.

Mnemonic: `candy maple cake sugar pudding cream honey rich smooth crumble sweet treat`

Amount of accounts: `30`

Price pure account: `1000`

gas limit: `3000000000`

#### Migrate contract to ganache.

`truffle migrate --reset`


#### Run Tests

`truffle test`

#### Rinkeby Deploy Contract

`truffle migrate --network rinkeby --reset`

# Deployed Contracts Addresses

Oraclize: 0x50E7F50599316c632a31CBe3409D5817716B8a46

ERC721Mintable: 0x1E4A75bE4bEAdaB460b6A5daE846fe239Af94b68

SquareVerifier: 0xfB2309396Dab2145E5fDA7E220B6c7EF3Ab47daa

SolnSquareVerifier: 0xcde4D4B1A6121C0d6409d3d42843adfd764D65CE

OpenSeas Link: https://testnets.opensea.io/collection/unidentified-contract-lfg7nebawp

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
