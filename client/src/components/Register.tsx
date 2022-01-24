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
import { isEmpty, isEqual, values } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { User } from "../models/user";
import { userState } from "../store/userStore";

const RegisterContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const RegisterContent = styled(Paper)({
  width: "50%",
  display: "flex",
  justifyContent: "center",
});

const RegisterForm = styled("form")({
  width: "100%",
  padding: 16,
});

export default function Register() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { error, isLoading, data, refetch } = useQuery(
    "register",
    async () => {
      const response = await axios.post<User>("/user", {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      return response.data;
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
      setUser(data);
      navigate("/");
    }
  }, [data]);

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.currentTarget.value);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.currentTarget.value);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const newFormError = {} as typeof formError;
    if (!firstName) {
      newFormError.firstName = "Please enter your first name.";
    }
    if (!lastName) {
      newFormError.lastName = "Please enter your last name.";
    }
    if (!username) {
      newFormError.username = "Please enter your username.";
    }
    if (!password) {
      newFormError.password = "Please enter your password.";
    }
    if (confirmPassword !== password) {
      newFormError.confirmPassword = "Your password does not match";
    }

    if (values(newFormError).every(isEmpty)) {
      refetch();
    }
    setFormError(newFormError);
  }

  return (
    <RegisterContainer>
      <RegisterContent>
        <RegisterForm onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">Create a new account</Typography>
            <TextField
              required
              value={firstName}
              onChange={handleFirstNameChange}
              variant="outlined"
              label="First Name"
              error={!!formError.firstName}
              helperText={formError.firstName}
            />
            <TextField
              required
              value={lastName}
              onChange={handleLastNameChange}
              variant="outlined"
              label="Last Name"
              error={!!formError.lastName}
              helperText={formError.lastName}
            />
            <TextField
              required
              value={username}
              onChange={handleUsernameChange}
              variant="outlined"
              label="Username"
              error={!!formError.username}
              helperText={formError.username}
            />
            <TextField
              required
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              label="Password"
              error={!!formError.password}
              helperText={formError.password}
            />
            <TextField
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              variant="outlined"
              label="Confirm Password"
              error={!!formError.confirmPassword}
              helperText={formError.confirmPassword}
            />

            <Box display="flex" width="100%" justifyContent="end">
              <LoadingButton
                type="submit"
                loading={isLoading}
                variant="contained"
              >
                Create Account
              </LoadingButton>
            </Box>
          </Stack>
        </RegisterForm>
      </RegisterContent>
    </RegisterContainer>
  );
}
