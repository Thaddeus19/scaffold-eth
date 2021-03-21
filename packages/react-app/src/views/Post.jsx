import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { juicyDetails } from "../data";

export default function Post({ setParam }) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const postUrl = juicyDetails[id]?.link;

  return (
    <div>
      <h3>ID: {id}</h3>
      <h3>{postUrl}</h3>
      <li>allow user to quiz</li>
      {/*<li>allow adding comments</li>*/}
      {/*<li>burn attentnion tokens for upvote</li>*/}
      <p>
        Comments and Upvoting via burning Attention tokens are stretch goals atm
      </p>
      <Link
        // onClick={() => {
        //   setRoute("/post/2");
        // }}
        to={`/quiz/${id}`}
      >
        Take the quiz; earn some influence
      </Link>
    </div>
  );
}
