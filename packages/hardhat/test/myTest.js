const { ethers } = require("hardhat")
const { use, expect } = require("chai")
const { solidity } = require("ethereum-waffle")

use(solidity)

const ATTENTION_TOKEN_ID = 5

describe("My Dapp", function () {
  describe("YourContract", function () {
    it("should prevent transfer of attention tokens", async () => {
      const [owner, secondAccount] = await ethers.getSigners()

      const ManagementContract = await ethers.getContractFactory("DemoErc1155")

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

      const ManagementContract = await ethers.getContractFactory("DemoErc1155")

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
  })
})
