import { LoadingButton } from "@mui/lab";
import {
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { isEmpty, values } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { User } from "../models/user";
import { userState } from "../store/userStore";

const LoginContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const LoginContent = styled(Paper)({
  width: "50%",
  display: "flex",
  justifyContent: "center",
});

const LoginForm = styled("form")({
  width: "100%",
  padding: 16,
});

export default function Login() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({
    username: "",
    password: "",
  });
  const { error, isLoading, data, refetch } = useQuery(
    "login",
    () => {
      if (username && password) {
        return axios
          .post<User>("/user/login", {
            username: username,
            password: password,
          })
          .then((response) => response.data);
      }
    },
    {
      enabled: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (error) {
      setFormError({
        ...formError,
        username: (error as any)?.response?.data,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("access_token", data.token);
      axios.defaults.headers.common["Authorization"] = data.token;
      setUser(data);
      navigate("/");
    }
  }, [data]);

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newFormError = {} as typeof formError;
    if (!username) {
      newFormError.username = "Please enter your username.";
    }
    if (!password) {
      newFormError.password = "Please enter your password.";
    }

    if (values(newFormError).every(isEmpty)) {
      refetch();
    }
    setFormError(newFormError);
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LoginForm onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">Login to your account</Typography>
            <TextField
              value={username}
              onChange={handleUsernameChange}
              variant="outlined"
              label="Username"
              error={!!formError.username}
              helperText={formError.username}
            />
            <TextField
              type="password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              label="Password"
              error={!!formError.password}
              helperText={formError.password}
            />

            <Box display="flex" width="100%" justifyContent="end">
              <LoadingButton
                type="submit"
                loading={isLoading}
                variant="contained"
              >
                Login
              </LoadingButton>
            </Box>
            <Link to="/register">Don't have an account? Create one</Link>
          </Stack>
        </LoginForm>
      </LoginContent>
    </LoginContainer>
  );
}
