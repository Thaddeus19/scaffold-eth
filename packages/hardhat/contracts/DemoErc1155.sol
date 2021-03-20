// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DemoErc1155 is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    uint256 public constant ATTENTION_TOKEN = 5;

    constructor() public ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10**9, "");
        _mint(msg.sender, SHIELD, 10**9, "");
    }

    function mintAttentionReward(address to) public onlyOwner returns (bool) {
        _mint(to, ATTENTION_TOKEN, 1, "");
        return true;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        public
        virtual
        override
    {
        require(id != ATTENTION_TOKEN, "AttentionToken: Cannot transfer earned tokens, can only burn for rewards.");
       super.safeTransferFrom(from, to, id, amount, "0x00");
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        public
        virtual
        override
    {
        for (uint256 i = 0; i < ids.length && i < 7; ++i) {
            require(ids[i] != ATTENTION_TOKEN, "AttentionToken: Cannot transfer earned tokens, can only burn for rewards.");
        }
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}