import React, { useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import config from "../../../config.json";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 48.8566, // Coordonnées de Paris, France
    lng: 2.3522,
};

const options = {
    disableDefaultUI: true, // Désactive les contrôles par défaut
    zoomControl: true, // Active le contrôle de zoom
};

const GoogleMapsWithAutocomplete: React.FC = () => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (!place.geometry || !place.geometry.location) {
                alert("Aucun détail disponible pour ce lieu.");
                return;
            }

            // Centrer la carte sur l'emplacement choisi
            if (mapRef.current) {
                const location = place.geometry.location;
                mapRef.current.setCenter(location);
                mapRef.current.setZoom(14); // Zoom sur l'emplacement
            }
        }
    };

    const apiKey = config.GOOGLE_MAPS_API_KEY;
    console.log(apiKey)

    return (
        <LoadScript
            googleMapsApiKey={apiKey}
            libraries={["places"]} // Charge la bibliothèque places
        >
            <div style={{ position: "relative" }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Rechercher un lieu"
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                        width: "300px",
                        height: "40px",
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    }}
                />
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={options}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                >
                    <Autocomplete
                        onLoad={(autocomplete) => {
                            autocompleteRef.current = autocomplete;
                        }}
                        onPlaceChanged={handlePlaceChanged}
                    >
                        <div />
                    </Autocomplete>
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default GoogleMapsWithAutocomplete;
