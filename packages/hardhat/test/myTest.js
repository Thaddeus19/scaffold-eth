const { ethers } = require("hardhat")
const { use, expect } = require("chai")
const { solidity } = require("ethereum-waffle")

use(solidity)

describe("My Dapp", function () {
  let myContract
  // it("Should return the new greeting once it's changed", async function() {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //
  //   await greeter.deployed();
  //   expect(await greeter.greet()).to.equal("Hello, world!");
  //
  //   await greeter.setGreeting("Hola, mundo!");
  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const YourContract = await ethers.getContractFactory("DemoErc1155")
      const signers = await ethers.getSigners()

      console.log(signers[0].address)

      myContract = await YourContract.deploy()

      console.log(await myContract.owner())
      console.log(await myContract.owner())
    })

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners()

      const Token = await ethers.getContractFactory("DemoErc1155")

      const hardhatToken = await Token.deploy()

      const ownerBalance = await hardhatToken.balanceOf(owner.address, 2)
      expect(1).to.equal(ownerBalance)
    })
  })
})
