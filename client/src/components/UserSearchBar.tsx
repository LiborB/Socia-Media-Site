import { Autocomplete, Box, styled, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserSearchItem } from "../models/user-search-item";

export default function UserSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { isLoading, data } = useQuery(
    ["searchUsers", value],
    () =>
      axios
        .get<UserSearchItem[]>("/user/search", {
          params: {
            query: value,
          },
        })
        .then((x) => x.data),
    {
      enabled: !!value,
    }
  );

  const handleUserClick = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="w-2/5 relative">
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3 border border-blue-300 rounded-md"
        placeholder="Search..."
      />

      {isFocused && value && (
        <div className="absolute bg-white w-full  rounded-md shadow-lg">
          <ul>
            {data?.map((userSearchItem) => (
              <li
                onMouseDown={() => handleUserClick(userSearchItem.id)}
                className="py-2 px-4 cursor-pointer hover:bg-gray-50"
                key={userSearchItem.id}
              >
                {userSearchItem.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
