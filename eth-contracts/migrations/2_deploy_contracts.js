// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("DarkIslandToken");
var SquareVerifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC721Mintable);
  deployer.deploy(SquareVerifier).then (() => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
  });
};
