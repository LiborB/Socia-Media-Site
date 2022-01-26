import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

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
  return (
    <Container>
      <PostCard>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">Create a new post</Typography>
          <TextField
            placeholder="Give your post a name"
            helperText="The main headline of your post that others will see"
            variant="outlined"
            label="Post Title"
          />
          <TextField
            variant="outlined"
            label="Post Content"
            multiline
            helperText="Go wild!"
            minRows={4}
          />

          <Stack
            alignSelf="end"
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Button size="large" variant="text">
              Cancel
            </Button>
            <Button size="large" variant="contained">
              Create Post
            </Button>
          </Stack>
        </Stack>
      </PostCard>
    </Container>
  );
}
