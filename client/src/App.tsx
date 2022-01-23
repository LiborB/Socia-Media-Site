import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { userState } from "./store/userStore";
import { User } from "./models/user";


function App() {
  const navigate = useNavigate();
  const token = useRef(localStorage.getItem("access_token"));
  const { isLoading, isError, data } = useQuery(
    "auth",
    () =>
      axios
        .post<User>("/user/auth", null, {
          params: {
            token: token.current,
          },
        })
        .then((res) => res.data)
  );
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <RecoilRoot>
      {isLoading ? (
        <CircularProgress />
      ) : (

        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      )}
    </RecoilRoot>
  );
}

export default App;
