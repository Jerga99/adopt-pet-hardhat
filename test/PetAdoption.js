
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("PetAdoption", function() {

  async function deployContractFixture() {
    const PETS_COUNT = 5;
    const ADOPTED_PET_IDX = 0;

    const [owner, account2, account3] = await ethers.getSigners();
    const PetAdoption = await ethers.getContractFactory("PetAdoption");
    const contract = await PetAdoption.deploy(PETS_COUNT);

    await contract.connect(account3).adoptPet(ADOPTED_PET_IDX);

    return { 
      owner, account2, account3, 
      contract,  
      petsAddedCount: PETS_COUNT,
      adoptedPetIdx: ADOPTED_PET_IDX
    };
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

    it("Should revert with pet is already adopted", async function() {
      const { contract, adoptedPetIdx } = await loadFixture(deployContractFixture);

      await expect(contract.adoptPet(adoptedPetIdx)).to.be.revertedWith("Pet is already adopted");
    });

    it("Should adopt pet succesfuly", async function() {
      const { contract, account2 } = await loadFixture(deployContractFixture);
      const idx = 1;
      await expect(contract.connect(account2).adoptPet(idx)).not.to.be.reverted;

      const petOwnerAddress = await contract.petIdxToOwnerAddress(idx);
      expect(petOwnerAddress).to.equal(account2.address);
    });
  });
});


// npx hardhat test --network localhost
// npx hardhat test
