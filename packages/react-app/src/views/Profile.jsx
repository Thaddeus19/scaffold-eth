import React, { useEffect, useState } from "react";

export default function Profile({ smartContract, myaddress }) {
  const [attentionBalance, setAttentionBalance] = useState(0);
  const [fungibleBalance, setFungibleBalance] = useState(0);

  const getAttentionBalance = async address => {
    return smartContract["balanceOf"](address, 5);
  };

  const getFungibleBalance = async address => {
    return smartContract["balanceOf"](address, 6);
  };

  const makeYourSacrifice = async () => {
    return smartContract["burnAttentionForReward"]();
  };

  useEffect(() => {
    const loadBalances = async () => {
      const attn = await getAttentionBalance(myaddress);
      const fun = await getFungibleBalance(myaddress);

      setAttentionBalance(attn.toString());
      setFungibleBalance(fun.toString());
    };

    loadBalances();
  }, []);

  return (
    <div>
      <h3>My Profile: todo</h3>
      <h5>attn: {attentionBalance}</h5>
      <h5>fun: {fungibleBalance}</h5>

      <button onClick={makeYourSacrifice}>
        allow for burning attention tokens for fungible tokens
      </button>
      <h5> stretch: display Logan's artwork</h5>
    </div>
  );
}
