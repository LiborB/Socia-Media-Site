import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userStore";
import ProfileCircle from "./ProfileCircle";
import UserSearchBar from "./UserSearchBar";

const AppToolbar = styled(Toolbar)({
  justifyContent: "space-between",
});

interface Props {
  hidden: boolean;
}

function TopBar(props: Props) {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <Fragment>
      {!props.hidden && (
        <AppBar hidden position="static" color="transparent">
          <AppToolbar>
            <Typography
              className="cursor-pointer"
              variant="h6"
              component="div"
              onClick={handleLogoClick}
            >
              Social Media Site
            </Typography>
            <UserSearchBar />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/post")}
            >
              New Post
            </Button>
            <ProfileCircle userId={user?.id} onClick={handleProfileClick} />
          </AppToolbar>
        </AppBar>
      )}
    </Fragment>
  );
}

export default React.memo(TopBar);
