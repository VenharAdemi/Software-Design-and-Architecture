import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <img src="assets/logo-header.png" alt="logo" className={"logoheader"} />
      </Toolbar>
    </AppBar>
  );
}
