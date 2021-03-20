import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Form, notification, Typography } from "antd";
import { AddressInput, Blockie } from "../components";

const { Title, Paragraph } = Typography;

function Erc1155Sandbox({ address, localContracts, mainnetProvider }) {
  const [addressInfoForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [decimals, setDecimals] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [myBalance, setMyBalance] = useState();
  const [addressBalance, setAddressBalance] = useState();
  const [addressAllowance, setAddressAllowance] = useState();
  const [myAllowanceOnAddress, setMyAllowanceOnAddress] = useState();

  let contractOptions = localContracts ? Object.keys(localContracts) : [];
  const [selectedContract, setSelectedContract] = useState("DemoErc1155");

  if (!localContracts) {
    return <> loading </>;
  }

  const makeCall = async (callName, contract, args) => {
    if (contract[callName]) {
      let result;
      if (args) {
        result = await contract[callName](...args);
      } else {
        result = await contract[callName]();
      }
      if (result.hash) {
        notification.open({
          message: "Success",
          description: `👀  ${callName} successful`,
        });
      }
      return result;
    }
  };

  let contractTitle;
  console.log({ localContracts });

  if (selectedContract) {
    contractTitle = (
      <p>
        <span style={{ verticalAlign: "middle" }}>
          <Blockie address={localContracts[selectedContract]["address"]} />
        </span>
        <span style={{ verticalAlign: "middle", paddingLeft: 5, fontSize: 28 }}>
          {selectedContract}
        </span>
      </p>
    );
  }

  const getAddressInfo = async values => {
    console.log(values);
    // if (selectedContract) {
    //   let _balanceOf = await makeCall("balanceOf", localContracts[selectedContract], [values.address]);
    //   let _allowanceOf = await makeCall("allowance", localContracts[selectedContract], [address, values.address]);
    //   let _myAllowanceOn = await makeCall("allowance", localContracts[selectedContract], [values.address, address]);
    //
    //   setAddressAllowance(formatUnits(_allowanceOf, decimals));
    //   setMyAllowanceOnAddress(formatUnits(_myAllowanceOn, decimals));
    //   setAddressBalance(formatUnits(_balanceOf, decimals));
    // }
  };

  const executeUpdateFunction = async values => {
    console.log(values);
    // let parsedAmount = parseUnits(values.amount, decimals);
    // let args;
    // if (values.function === "transferFrom") {
    //   args = [values.fromAddress, values.toAddress, parsedAmount];
    // } else {
    //   args = [values.toAddress, parsedAmount];
    // }
    //
    // let selectedFunction = values.function ? values.function : defaultUpdateFunction;
    //
    // try {
    //   let result = await makeCall(selectedFunction, localContracts[selectedContract], args);
    //   console.log(result);
    //   notification.open({
    //     message: "Success",
    //     description: `👀 ${selectedFunction}: ${values.amount} to ${values.toAddress}`,
    //   });
    // } catch (e) {
    //   notification.open({
    //     message: "Transaction failed",
    //     description: `👀 ${e.message}`,
    //   });
    // }
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        width: "100%",
        margin: "auto",
        backgroundColor: "pink",
      }}
    >
      <>
        {contractTitle}
        <Paragraph
          copyable={{ text: localContracts[selectedContract]["address"] }}
        >
          {"Contract: " +
            localContracts[selectedContract]["address"].substring(0, 7)}
        </Paragraph>
        <p>{"TotalSupply: " + totalSupply}</p>
        <p>{"Balance: " + myBalance}</p>
        {selectedContract && localContracts[selectedContract]["mintTokens"] ? (
          <Button
            onClick={async () => {
              let result = await makeCall(
                "mintTokens",
                localContracts[selectedContract],
              );
              console.log(result);
            }}
          >
            Mint
          </Button>
        ) : null}
        {/*{selectedContract && localContracts[selectedContract]["burnTokens"] ? (*/}
        {/*  <Button*/}
        {/*    onClick={() => {*/}
        {/*      makeCall("burnTokens", localContracts[selectedContract]);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Burn*/}
        {/*  </Button>*/}
        {/*) : null}*/}
        {/*{selectedContract && localContracts[selectedContract]["outstandingTokens"] ? (*/}
        {/*  <Button*/}
        {/*    onClick={async () => {*/}
        {/*      let result = await makeCall("outstandingTokens", localContracts[selectedContract]);*/}
        {/*      let formattedResult = formatUnits(result, decimals);*/}
        {/*      notification.open({*/}
        {/*        message: "Tokens outstanding",*/}
        {/*        description: `👀 There are ${formattedResult} tokens available to claim`,*/}
        {/*      });*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    GetOutstanding*/}
        {/*  </Button>*/}
        {/*) : null}*/}
        {/*{selectedContract && localContracts[selectedContract]["mintOutstandingTokens"] ? (*/}
        {/*  <Button*/}
        {/*    onClick={() => {*/}
        {/*      makeCall("mintOutstandingTokens", localContracts[selectedContract]);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    MintOutstanding*/}
        {/*  </Button>*/}
        {/*) : null}*/}
        <Divider />
        <div style={{ margin: 8 }}>
          <Title level={4}>Interact</Title>
          <Form
            form={updateForm}
            layout="horizontal"
            onFinish={executeUpdateFunction}
            onFinishFailed={errorInfo => {
              console.log("Failed:", errorInfo);
            }}
          >
            {/*<Form.Item name="function">*/}
            {/*  <Radio.Group*/}
            {/*    options={["transfer", "approve", "increaseAllowance", "decreaseAllowance", "transferFrom"]}*/}
            {/*    optionType="button"*/}
            {/*    onChange={e => {*/}
            {/*      console.log(e);*/}
            {/*      setUpdateFormFunction(e.target.value);*/}
            {/*    }}*/}
            {/*    defaultValue={defaultUpdateFunction}*/}
            {/*  />*/}
            {/*</Form.Item>*/}
            {/*{updateFormFunction === "transferFrom" ? (*/}
            {/*  <Form.Item*/}
            {/*    name="fromAddress"*/}
            {/*    rules={[*/}
            {/*      {*/}
            {/*        required: updateFormFunction === "transferFrom",*/}
            {/*        message: "Address to transfer from",*/}
            {/*      },*/}
            {/*    ]}*/}
            {/*  >*/}
            {/*    <AddressInput*/}
            {/*      placeholder="fromAddress"*/}
            {/*      ensProvider={mainnetProvider}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*) : null}*/}
            <Form.Item
              name="toAddress"
              rules={[{ required: true, message: "Please enter an address" }]}
            >
              <AddressInput
                placeholder="address"
                ensProvider={mainnetProvider}
              />
            </Form.Item>
            {/*<Form.Item*/}
            {/*  name="amount"*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: `Set the value to ${updateFormFunction}`,*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <Input placeholder="amount" />*/}
            {/*</Form.Item>*/}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Divider />
        <div style={{ margin: 8 }}>
          <Title level={4}>Address Info</Title>
          <Form
            form={addressInfoForm}
            layout="horizontal"
            onFinish={getAddressInfo}
            onFinishFailed={errorInfo => {
              console.log("Failed:", errorInfo);
            }}
          >
            <Form.Item name="address">
              <AddressInput
                placeholder="address"
                layout="inline"
                ensProvider={mainnetProvider}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Get address info
              </Button>
            </Form.Item>
          </Form>
          {addressBalance ? (
            <p>{`Address Balance: ${addressBalance}`}</p>
          ) : null}
          {addressAllowance ? (
            <p>{`Address Allowance on my ${selectedContract} tokens: ${addressAllowance}`}</p>
          ) : null}
          {myAllowanceOnAddress ? (
            <p>{`My Allowance on address: ${myAllowanceOnAddress}`}</p>
          ) : null}
        </div>
      </>
    </Card>
  );
}

export default Erc1155Sandbox;
