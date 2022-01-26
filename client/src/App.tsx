import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { userState } from "./store/userStore";
import { User } from "./models/user";
import Register from "./components/Register";
import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useRef(localStorage.getItem("access_token"));
  const isLoginPage = useMemo(
    () =>
      location.pathname.includes("/login") ||
      location.pathname.includes("/register"),
    [location.pathname]
  );
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
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if ((isError || !token.current) && !isLoginPage) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  }, [isError, token.current]);

  useEffect(() => {
    if (data) {
      setUser(data);
      localStorage.setItem("access_token", data.token);
      axios.defaults.headers.common["Authorization"] = data.token;
    }
  }, [data]);

  return (
    <Box>
      <TopBar hidden={!!!user} />
      <Box p={4}>
        {isLoading ? (
          <Box position="fixed" left="50%" top="50%">
            <CircularProgress />
          </Box>
        ) : (
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/post" element={<CreatePost />}></Route>
          </Routes>
        )}
      </Box>
    </Box>
  );
}

export default App;
