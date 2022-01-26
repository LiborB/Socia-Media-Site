import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";

interface Props {
  hidden: boolean;
}

function TopBar(props: Props) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {!props.hidden && (
        <AppBar hidden position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Social Media Site
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/post")}
            >
              New Post
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </Fragment>
  );
}

export default React.memo(TopBar);
