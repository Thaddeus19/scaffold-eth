import React from "react";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <a
      href="https://github.com/austintgriffith/scaffold-eth"
      target="_blank"
      rel="noopener noreferrer"
    >
      <PageHeader
        title="Proof of Attention"
        subTitle="Earn voting power by showing competence. Burn voting power for ERC20's or NFT's!"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
