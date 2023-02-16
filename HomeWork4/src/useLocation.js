// Import React and the 'useState' and 'useEffect' hooks from the React library
import React, { useState, useEffect } from "react";

// Define a custom hook called 'useLocation' to get the user's current location
const useLocation = () => {

    // Initialize the 'location' state using the 'useState' hook
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    // Define two callback functions to handle the result of the 'getCurrentPosition' method of the Geolocation API
    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };
    const onError = (error) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    // Use the 'useEffect' hook to call the 'getCurrentPosition' method of the Geolocation API once when the component is mounted
    useEffect(() => {
        // Check if the Geolocation API is supported
        if (!("geolocation" in navigator)) {
            // If not supported, call the 'onError' function with an error object indicating that geolocation is not supported
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
        // If supported, call the 'getCurrentPosition' method of the Geolocation API with the 'onSuccess' and 'onError' functions as callbacks
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    // Return the 'location' state object
    return location;
};

// Export the 'useLocation' hook as the default module
export default useLocation;