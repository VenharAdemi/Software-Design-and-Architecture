// This code imports various components and hooks from the Material-UI and React libraries.
import { Box, Button, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// This is a functional component that renders the Home page.
function Home() {
// This hook allows navigation between different routes.
const navigate = useNavigate();

// This function navigates to the Map component.
const gotToFirstComp = () => {
navigate("/map");
};

// This function navigates to the List component.
const goToListOfHospitals = () => {
navigate("/list");
}

// This is a state hook that stores the user's search query.
const [searchHospital, setSearchHospital] = React.useState<string>("");

// This is the JSX code that is rendered by the component.
return (
  <div className="App">
  <header className="App-header">
  <Box
  flexDirection="column"
  alignContent={"center"}
  display={"flex"}
  component="form"
  sx={{
  '& > :not(style)': { m: 1, width: '25ch' },
  }}
  noValidate
  >
  {/* This input field allows users to search for hospital names. */}
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

         {/* This button will eventually allow users to find the nearest hospitals. */}
      <Tooltip title="To be implemented">
        <Button variant="contained" style={{ width: "250px" }}>
          Find nearest hospitals
        </Button>
      </Tooltip>
      
      {/* This button will eventually allow users to customize the app settings. */}
      <Tooltip title="To be implemented">
        <Button variant="contained" style={{ width: "250px" }}>
          Settings
        </Button>
      </Tooltip>
      
      {/* This button navigates to the Map component. */}
      <Button variant="contained" style={{ width: "250px" }} onClick={gotToFirstComp}>
        Open the map
      </Button>
      
      {/* This button navigates to the List component. */}
      <Button variant="contained" style={{ width: "250px" }} onClick={goToListOfHospitals}>
        Hospital List
      </Button>
    </Box>
  </header>
</div>
  );
}

export default Home;
