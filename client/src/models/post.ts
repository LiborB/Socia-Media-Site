import { User } from "./user";

export type Post = {
  id: number;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  user: User;
};
