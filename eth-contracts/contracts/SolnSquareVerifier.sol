pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import './ERC721Mintable.sol';
import './verifier.sol';


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is DarkIslandToken{

    Verifier private contractVerifier;

    constructor(address _contractVerifier) public{
        contractVerifier = Verifier(_contractVerifier);
    }

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
    }

// TODO define an array of the above struct
    Solution[] private solutions;
    uint256 public solutionCount=0;

    function getSolutionCount() public view returns(uint256) {
        return solutions.length;
    }
// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) public solutionsMapping;


// TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 indexed solutionIndex, address indexed solutionAddress);


// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address solutionAddress) public returns(uint256 id){
        Solution memory solution = Solution(solutionCount, solutionAddress);
        solutions.push(solution);  
        uint256 id = solutionCount;
        solutionCount++;
        emit SolutionAdded(solutionCount, solutionAddress);
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(address to, uint256 tokenId,Verifier.Proof memory proof, uint[2] memory inputs ) public{

        bytes32 key = keccak256(abi.encodePacked(proof.a.X, proof.a.Y, proof.b.X, proof.b.Y, proof.c.X, proof.c.Y, inputs));
        require(solutionsMapping[key].solutionIndex == 0, "Solution already used.");
        require(contractVerifier.verifyTx(proof, inputs), "Verification failed");        
        
        uint256 id = addSolution(to);
        solutionsMapping[key] = solutions[id];

        mint(to, tokenId);  

    }

}





  


























