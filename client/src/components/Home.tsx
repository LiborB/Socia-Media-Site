import { Card, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Post } from "../models/post";
import { userState } from "../store/userStore";

export default function Home() {
  const user = useRecoilValue(userState);
  const { data: posts } = useQuery(
    "homePosts",
    () => axios.get<Post[]>(`/post/wall`).then((res) => res.data),
    {
      enabled: !!user,
    }
  );

  return (
    <div>
      <Stack direction="column">
        {posts?.map((post) => (
          <Card key={post.id}>{post.title}</Card>
        ))}
      </Stack>
    </div>
  );
}
