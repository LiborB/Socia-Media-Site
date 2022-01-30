import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import UserSearchBar from "./UserSearchBar";

const AppToolbar = styled(Toolbar)({
  justifyContent: "space-between",
});

interface Props {
  hidden: boolean;
}

function TopBar(props: Props) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
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
          </AppToolbar>
        </AppBar>
      )}
    </Fragment>
  );
}

export default React.memo(TopBar);
