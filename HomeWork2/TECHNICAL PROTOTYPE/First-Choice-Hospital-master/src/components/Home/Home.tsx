import { Box, Button, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const gotToFirstComp = () => {
    // This will navigate to first component
    navigate("/map");
  };

  const [searchHospital, setSearchHospital] = React.useState<string>("");

  return (
    <div className="App">
      <header className="App-header">
      <Box
      flex-direction="column"
      alignContent={"center"}
      display={"flex"}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
    >
      <Tooltip title="To be implemented">
        <TextField
          id="outlined-basic"
          label="Search hospital names"
          variant="outlined"
          value={searchHospital}
          onChange={(e) => setSearchHospital(e.target.value)}
          style={{ width: "250px" }}
        />
        </Tooltip>
        <Tooltip title="To be implemented">
        <Button variant="contained" style={{ width: "250px" }}>
          Find nearest hospitals
        </Button>
        </Tooltip>
        <Tooltip title="To be implemented">
        <Button variant="contained" style={{ width: "250px" }}>
          Settings
        </Button>
        </Tooltip>
        <Button variant="contained" style={{ width: "250px" }} onClick={gotToFirstComp}>
          Open the map
        </Button>
        </Box>
      </header>
    </div>
  );
}

export default Home;
