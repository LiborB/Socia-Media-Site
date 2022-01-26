import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Link,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { values, isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { getErrorMessage } from "../lib/axios-util";
import { userState } from "../store/userStore";

const Container = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const PostCard = styled(Card)({
  padding: 24,
  width: "30%",
});

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useRecoilValue(userState);

  const { error, isLoading, refetch, isSuccess } = useQuery(
    "createPost",
    () =>
      axios.post("/post", {
        userId: user?.id,
        title: title,
        content: content,
      }),
    {
      enabled: false,
      retry: false,
    }
  );

  const [formError, setFormError] = useState({
    title: "",
    content: "",
    api: "",
  });

  useEffect(() => {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      setFormError({
        ...formError,
        api: errorMessage,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormError = {} as typeof formError;

    if (!title) {
      newFormError.title = "Please enter a title.";
    }
    if (!content) {
      newFormError.content = "Please enter some details.";
    }

    if (values(newFormError).every(isEmpty)) {
      refetch();
    }

    setFormError(newFormError);
  };

  return (
    <Container>
      <PostCard>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">Create a new post</Typography>
            {formError.api && (
              <Typography color="red" variant="subtitle1">
                {formError.api}
              </Typography>
            )}
            <TextField
              error={!!formError.title}
              value={title}
              onChange={handleTitleChange}
              placeholder="Give your post a name"
              helperText={formError.title}
              variant="outlined"
              label="Post Title"
            />
            <TextField
              value={content}
              onChange={handleContentChange}
              variant="outlined"
              label="Post Content"
              error={!!formError.content}
              multiline
              helperText={formError.content}
              minRows={4}
            />

            <Stack
              alignSelf="end"
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Button size="large" variant="text" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <LoadingButton
                loading={isLoading}
                type="submit"
                size="large"
                variant="contained"
              >
                Create Post
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </PostCard>
    </Container>
  );
}
