import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UserStory({ setRoute }) {
  return (
    <div>
      Everything we need to do
      <ul>
        <li>
          <Link
            onClick={() => {
              setRoute("/post/1");
            }}
            to="/post/1"
          >
            Post 1
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setRoute("/post/2");
            }}
            to="/post/2"
          >
            Post 2
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setRoute("/profile");
            }}
            to="/profile"
          >
            My Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}
