/*global google*/
import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import Papa from "papaparse";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "1000px",
  height: "800px",
};

const center = {
  lat: 43.8506532,
  lng: 10.5175368,
};

async function GetData() {
  const data = Papa.parse(await fetchCsv(), { header: true });
  data.data.map((item: any, index: any) => {
    markers.push({
      id: index,
      latitude: item["latitude"],
      longitude: item["longitude"],
      name: item["name"],
    });
  });
  return data.data;
}

async function fetchCsv() {
  const response = await fetch("data/hospital-data.csv");
  if (response.body === null) throw new Error("response body is null");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  return csv;
}

let markers = [
  {
    id: 1,
    latitude: 100000,
    longitude: 100000,
    name: "placeholder",
  },
];

GetData();

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

function MyComponent() {
  const navigate = useNavigate();
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();
  const [userLat, setUserLat] = useState(0);
  const [userLong, setUserLong] = useState(0);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef<HTMLInputElement>(null);

  const gotToFirstComp = () => {
    navigate("/");
  };

  async function calculateRoute() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    if (destinationRef.current === undefined || destinationRef.current === null) {
      return;
    }
    if (destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService();

    const results = await directionService.route({
      origin: { lat: userLat, lng: userLong },
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (results === undefined) {
      console.log("results were undefined");
      return;
    }

    setDirectionsResponse(results);
    console.log(results);
    console.log(directionsResponse);
    console.log(destinationRef.current.value);
  }
  return (
    <>
      <Box
        flex-direction="column"
        alignContent={"center"}
        display="flex"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
      >
        <Autocomplete>
          {destinationRef && (
            <Input type="text" placeholder="Destination" ref={destinationRef} variant='outline' style={{ height: "50px", width: "200px"}}/>
          )}
        </Autocomplete>
        <Tooltip title="To be implemented">
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            style={{ width: "250px" }}
          />
        </Tooltip>
        <Tooltip title="To be implemented">
          <TextField
            id="outlined-basic"
            label="Language"
            variant="outlined"
            style={{ width: "250px" }}
          />
        </Tooltip>
        <Tooltip title="To be implemented">
          <Button
            onClick={calculateRoute}
            variant="contained"
            style={{ width: "250px", backgroundColor: "red" }}
          >
            Done
          </Button>
        </Tooltip>
        <Button
          variant="contained"
          style={{ width: "250px" }}
          onClick={gotToFirstComp}
        >
          Home
        </Button>
      </Box>
      {window.google === undefined ? (
        <>
          <LoadScript
            libraries={["places"]}
            googleMapsApiKey="AIzaSyBhdoauanGbs5WpNWixaPmPgUOKyGXa1W4"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
            >
              {markers.map((mark: any, index: any) => (
                <MarkerF
                  key={index}
                  position={{
                    lat: Number(mark.latitude),
                    lng: Number(mark.longitude),
                  }}
                  title={mark.name}
                />
              ))}
              <DirectionsRenderer directions={directionsResponse} />
              <></>
            </GoogleMap>
          </LoadScript>
        </>
      ) : (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {markers.map((mark: any, index: any) => (
            <MarkerF
              key={index}
              position={{
                lat: Number(mark.latitude),
                lng: Number(mark.longitude),
              }}
              title={mark.name}
            />
          ))}
          <></>
          <DirectionsRenderer directions={directionsResponse} />
        </GoogleMap>
      )}
    </>
  );
}

export default React.memo(MyComponent);
