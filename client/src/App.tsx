import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { Box, CircularProgress, Container } from "@mui/material";
import { userState } from "./store/userStore";
import { User } from "./models/user";
import Register from "./components/Register";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useRef(localStorage.getItem("access_token"));
  const { isLoading, isError, data } = useQuery(
    "auth",
    () => {
      if (token.current) {
        return axios
          .post<User>("/user/auth", null, {
            params: {
              token: token.current,
            },
          })
          .then((res) => res.data);
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (
      (isError || !token.current) &&
      !location.pathname.includes("/login") &&
      !location.pathname.includes("/register")
    ) {
      navigate("/login");
    }
  }, [isError, token.current]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <RecoilRoot>
      <Box p={4}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        )}
      </Box>
    </RecoilRoot>
  );
}

export default App;
