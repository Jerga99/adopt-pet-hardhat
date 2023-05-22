
const { expect } = require("chai");

describe("PetAdoption", function() {

  async function deployContract() {
    const [owner] = await ethers.getSigners();
    const PetAdoption = await ethers.getContractFactory("PetAdoption");
    const contract = await PetAdoption.deploy();

    return { owner, contract };
  }

  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      const { owner, contract } = await deployContract();
      const contractOwner = await contract.owner();

      expect(contractOwner).to.equal(owner.address);
    });
  });
});


// npx hardhat test --network hardhat
