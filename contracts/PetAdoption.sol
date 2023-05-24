// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract PetAdoption {
  address public owner;
  uint public petIndex = 0;
  uint[] public allAdoptedPets;

  mapping(uint => address) public petIdxToOwnerAddress;
  mapping(address => uint[]) public ownerAddressToPetList;

  constructor(uint initialPetIndex) {
    owner = msg.sender;
    petIndex = initialPetIndex;
  }

  function addPet() public {
    require(msg.sender == owner, "Only a contract owner can add a new pet!");
    petIndex++;
  }

  function adoptPet(uint adoptIdx) public {
    require(adoptIdx < petIndex, "Pet index out of bounds!");
    require(petIdxToOwnerAddress[adoptIdx] == address(0), "Pet is already adopted");

    console.log("Adopting pet: ", adoptIdx);

    petIdxToOwnerAddress[adoptIdx] = msg.sender;

    console.log("New Owner: ", petIdxToOwnerAddress[adoptIdx]);

    ownerAddressToPetList[msg.sender].push(adoptIdx);
    allAdoptedPets.push(adoptIdx);

    console.log("Pet: ", allAdoptedPets[0]);
  }

  function getOwner() public view returns(address) {
    return owner;
  }
  
}
