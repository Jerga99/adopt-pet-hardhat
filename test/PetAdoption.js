
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("PetAdoption", function() {

  async function deployContractFixture() {
    const PETS_COUNT = 5;
    const [owner, account2] = await ethers.getSigners();
    const PetAdoption = await ethers.getContractFactory("PetAdoption");
    const contract = await PetAdoption.deploy(PETS_COUNT);

    return { owner, contract, account2, petsAddedCount: PETS_COUNT };
  }

  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      const { owner, contract } = await loadFixture(deployContractFixture);
      const contractOwner = await contract.owner();
      expect(contractOwner).to.equal(owner.address);
    });

    it("Should return the right owner", async function() {
      const { owner, contract } = await loadFixture(deployContractFixture);
      const contractOwner = await contract.getOwner();
      expect(contractOwner).to.equal(owner.address);
    });
  });
  describe("Add Pet", function() {
    it("Should revert with the right error in case of other account", async function() {
      const { contract, account2 } = await loadFixture(deployContractFixture);

      await expect(contract.connect(account2).addPet()).to.be.revertedWith("Only a contract owner can add a new pet!");
    });

    it("Should increase pet index", async function() {
      const { contract, petsAddedCount } = await loadFixture(deployContractFixture);
      
      await contract.addPet();

      expect(await contract.petIndex()).to.equal(petsAddedCount + 1)
    })
  });
  describe("Adopt pet", function() {
    it("Should revert with index out of bounds", async function() {
      const { contract, petsAddedCount } = await loadFixture(deployContractFixture);
    
      await expect(contract.adoptPet(petsAddedCount)).to.be.revertedWith("Pet index out of bounds!");
      await expect(contract.adoptPet(-1)).to.be.rejectedWith("value out-of-bounds");
    });
  });
});


// npx hardhat test --network localhost
// npx hardhat test
