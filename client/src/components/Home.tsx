import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userStore";

export default function Home() {
  const user = useRecoilValue(userState);
  return <div>hello {user?.username}</div>;
}
