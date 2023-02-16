/*global google*/
import {
  GoogleMap,
  LoadScript,
  MarkerF, // MarkerF is an element that will be used to render markers on a Google Map.
  DirectionsRenderer, // DirectionsRenderer is an element that will be used to render directions on a Google Map.
  Autocomplete, // Autocomplete is an element that will be used to autocomplete an address in the input field.
} from "@react-google-maps/api";
import Papa from "papaparse"; // Papa is a library used to parse CSV files.
import { Box, Button, TextField, Tooltip } from "@mui/material"; // These are MUI components that will be used to build the page.
import { Input } from "@chakra-ui/react"; // This is a Chakra-UI component used to build the input field.
import { useNavigate } from "react-router-dom"; // This is a React Hook used for page navigation.

const containerStyle = { // This is an object that defines the width and height of the Google Map.
  width: "1000px",
  height: "800px",
};

const center = { // This is an object that defines the starting coordinates of the Google Map.
  lat: 43.8506532,
  lng: 10.5175368,
};

async function GetData() { // This function is used to get the hospital data from a CSV file.
  const data = Papa.parse(await fetchCsv(), { header: true }); // Uses Papa to parse the CSV file and get the data.
  data.data.map((item: any, index: any) => { // Loops through the data and creates an array of markers with the necessary information.
    markers.push({
      id: index,
      latitude: item["latitude"],
      longitude: item["longitude"],
      name: item["name"],
    });
  });
  return data.data; // Returns the hospital data.
}

async function fetchCsv() { // This function is used to fetch the CSV file.
  const response = await fetch("data/hospital-data.csv"); // Fetches the CSV file from the data folder.
  if (response.body === null) throw new Error("response body is null"); // Throws an error if the response body is null.
  const reader = response.body.getReader(); // Initializes a new ReadableStream.
  const result = await reader.read(); // Reads the CSV data.
  const decoder = new TextDecoder("utf-8"); // Initializes a new TextDecoder.
  const csv = decoder.decode(result.value); // Decodes the CSV data.
  return csv; // Returns the CSV data.
}

let markers = [ // This is an array that will store the markers on the Google Map.
  {
    id: 1,
    latitude: 100000,
    longitude: 100000,
    name: "placeholder",
  },
];

GetData(); // Calls the GetData function to get the hospital data.

const Marker: React.FC<google.maps.MarkerOptions> = (options) => { // This component renders the markers on the Google Map.
  const [marker, setMarker] = React.useState<google.maps.Marker>(); // Initializes the marker state.

  React.useEffect(() => { // This effect is called when the component is mounted and creates a new marker instance.
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
  const navigate = useNavigate();//This imports the useNavigate hook from React Router and assigns it to a constant called navigate.
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();//This declares a state variable called directionsResponse and a function called setDirectionsResponse to update it. The state is initially set to undefined.
  const [userLat, setUserLat] = useState(0);
  const [userLong, setUserLong] = useState(0);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef<HTMLInputElement>(null);
  //This declares a new ref using the useRef hook to store a reference to the input field for the user to specify their destination.

  const gotToFirstComp = () => { //This defines a function called gotToFirstComp to navigate to the home page.
    navigate("/");
  };

  async function calculateRoute() {//This defines an async function called calculateRoute to calculate and display the route from the user's current location to their specified destination.
    navigator.geolocation.getCurrentPosition(function (position) {//This gets the current position of the user using the getCurrentPosition method and sets the userLat and userLong state variables to the latitude and longitude values returned by the method.
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });


    if (destinationRef.current === undefined || destinationRef.current === null) {
      return; //This checks if the destinationRef ref is not yet set and returns early if it's not.
    }
    if (destinationRef.current.value === "") {
      return; // This checks if the destinationRef input field is empty and returns early if it is.
    }
    const directionService = new google.maps.DirectionsService();//This creates a new instance of the DirectionsService class from the Google Maps API.

    const results = await directionService.route({ //This calls the route method on the directionService object to calculate the route and saves the results to a results variable.
      origin: { lat: userLat, lng: userLong },
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (results === undefined) { //This checks if the results variable is undefined and returns early if it is.
      console.log("results were undefined");
      return;
    }

    setDirectionsResponse(results);// This sets the directionsResponse state variable to the results value returned by the route method.
    console.log(results);
    console.log(directionsResponse);
    console.log(destinationRef.current.value);
  }
  return (
    //This is a component from the Material-UI library that displays a box with the specified styles and properties.
    <>
      <Box> flex-direction="column"
        alignContent={"center"}
        display="flex"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
      </Box>
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
