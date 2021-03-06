import { atom } from "recoil";
import { User } from "../models/user";

export const userState = atom<User | null>({
    key: "user",
    default: null
})