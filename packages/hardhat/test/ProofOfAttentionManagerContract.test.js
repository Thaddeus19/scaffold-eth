const { ethers } = require("hardhat")
const { use, expect } = require("chai")
const { solidity } = require("ethereum-waffle")

use(solidity)

const ATTENTION_TOKEN_ID = 5
const FUNGIBLE_TOKEN = 6
// This conversion rate will eventually be algorithmic with community size
const ASSUMED_ATTENTNION_TO_FUNGIBLE_CONVERSION_REQUIREMENT = 10

describe("Proof of Attention", function () {
  describe("ProofOfAttentionManagerContract", function () {
    it("should prevent transfer of attention tokens", async () => {
      const [owner, secondAccount] = await ethers.getSigners()

      const ManagementContract = await ethers.getContractFactory(
        "ProofOfAttentionManagerContract"
      )

      const management = await ManagementContract.deploy()
      const numberAttentionTokensToMint = 5

      /*
       * Rewards attention tokens to the second address and ensure their
       * balance is correct.
       */
      for (let i = 0; i < numberAttentionTokensToMint; i++) {
        await management.mintAttentionReward(secondAccount.address)
      }
      const secondAttentionBalance = await management.balanceOf(
        secondAccount.address,
        ATTENTION_TOKEN_ID
      )
      expect(numberAttentionTokensToMint).to.equal(secondAttentionBalance)

      const tokensToTransfer = 3
      await expect(
        management.safeTransferFrom(
          secondAccount.address,
          owner.address,
          ATTENTION_TOKEN_ID,
          tokensToTransfer,
          "0x00"
        )
      ).to.be.revertedWith(
        "AttentionToken: Cannot transfer earned tokens, can only burn for rewards."
      )
    })

    it("should prevent batch transfer of attention tokens", async () => {
      const [owner, secondAccount] = await ethers.getSigners()

      const ManagementContract = await ethers.getContractFactory(
        "ProofOfAttentionManagerContract"
      )

      const management = await ManagementContract.deploy()

      const numberAttentionTokensToMint = 5
      /*
       * Rewards attention tokens to the second address and ensure their
       * balance is correct.
       */
      for (let i = 0; i < numberAttentionTokensToMint; i++) {
        await management.mintAttentionReward(secondAccount.address)
      }
      const secondAttentionBalance = await management.balanceOf(
        secondAccount.address,
        ATTENTION_TOKEN_ID
      )
      expect(numberAttentionTokensToMint).to.equal(secondAttentionBalance)

      const tokensToTransfer = 3
      await expect(
        management
          .connect(secondAccount)
          .safeBatchTransferFrom(
            secondAccount.address,
            owner.address,
            [ATTENTION_TOKEN_ID],
            [tokensToTransfer],
            "0x00"
          )
      ).to.be.revertedWith(
        "AttentionToken: Cannot transfer earned tokens, can only burn for rewards."
      )
    })

    it("should allow a user with enough attention tokens to burn them in exchange for a fungible topic token", async () => {
      const [owner, secondAccount] = await ethers.getSigners()

      const ManagementContract = await ethers.getContractFactory(
        "ProofOfAttentionManagerContract"
      )

      const management = await ManagementContract.deploy()

      /* Mint enough attention tokens to allow for burn for reward */
      for (
        let i = 0;
        i < ASSUMED_ATTENTNION_TO_FUNGIBLE_CONVERSION_REQUIREMENT;
        i++
      ) {
        await management.mintAttentionReward(owner.address)
      }

      /* Perform the sacrifice */
      await management.burnAttentionForReward()
      const expectedAttentionCountAfterBurn = 0
      const expectedFungibleRewardAfterBurn = 1

      const ownerBalances = await management.balanceOfBatch(
        [owner.address, owner.address],
        [ATTENTION_TOKEN_ID, FUNGIBLE_TOKEN]
      )
      expect(ownerBalances.map((bn) => parseInt(bn, 10))).to.deep.equal([
        expectedAttentionCountAfterBurn,
        expectedFungibleRewardAfterBurn,
      ])
    })
  })
})
