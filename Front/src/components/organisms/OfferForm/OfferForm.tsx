import React, {useEffect, useRef, useState} from 'react';
import config from "../../../config.json";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import {DebounceInput, Typography, TextField, Button, Autocomplete, Switch, FormControlLabel} from "../../atoms";
import axios from "axios";
import GoogleMapAutocomplete from "../../molecules/GoogleMapAutocomplete/GoogleMapAutocomplete";

const OfferForm: React.FC = () => {
    // Utilisation du hook d'état pour gérer la valeur des champs du formulaire
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<{ id: number; label: string } | null>(null);
    const [isDonation, setIsDonation] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');
    const [longitude, setLongitude] = useState<number>(2.3522);
    const [latitude, setLatitude] = useState<number>(48.8566);

    // Fonction pour gérer le changement de valeur du titre
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    // Fonction pour gérer le changement de valeur de la description
    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    // Fonction pour gérer le changement de valeur de la catégorie
    const handleChangeCategory = (event: React.ChangeEvent<{}>, newValue: { id: number; label: string } | null) => {
        setCategory(newValue);
    };
    // Fonction pour gérer le changement de valeur de la catégorie
    const handleChangeDonation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDonation(event.target.checked);
    };

    const aCategory = [
        {"id": 1, "label": "Bureautique"},
        {"id": 2, "label": "Électronique"},
        {"id": 3, "label": "Informatique"},
        {"id": 4, "label": "Mobilier"},
        {"id": 5, "label": "Vêtements"},
        {"id": 6, "label": "Chaussures"},
        {"id": 7, "label": "Jouets"},
        {"id": 8, "label": "Électroménager"},
        {"id": 9, "label": "Décoration"},
        {"id": 10, "label": "Jardinage"},
        {"id": 11, "label": "Bricolage"},
        {"id": 12, "label": "Sport"},
        {"id": 13, "label": "Instruments de musique"},
        {"id": 14, "label": "Livres"},
        {"id": 15, "label": "Films et séries"},
        {"id": 16, "label": "Jeux vidéo"},
        {"id": 17, "label": "Artisanat"},
        {"id": 18, "label": "Bijoux et accessoires"},
        {"id": 19, "label": "Beauté et bien-être"},
        {"id": 20, "label": "Cuisine et vaisselle"},
        {"id": 21, "label": "Papeterie"},
        {"id": 22, "label": "Photographie"},
        {"id": 23, "label": "Loisirs créatifs"},
        {"id": 24, "label": "Camping et randonnée"},
        {"id": 25, "label": "Équipements de plein air"},
        {"id": 26, "label": "Accessoires de voiture"},
        {"id": 27, "label": "Animaux de compagnie"},
        {"id": 28, "label": "Santé"},
        {"id": 29, "label": "Collection"},
        {"id": 30, "label": "Vintage"},
        {"id": 31, "label": "Antiquités"},
        {"id": 32, "label": "Éducation et apprentissage"},
        {"id": 33, "label": "Matériel de sécurité"},
        {"id": 34, "label": "Fournitures pour bébé"},
        {"id": 35, "label": "Accessoires de mode"},
    ];

    // Fonction pour gérer le clic sur le bouton "Valider"
    const handleSubmit = () => {

        console.log({
            "userId": 314,
            "categoryId": category?.id,
            "title": title,
            "description": description,
            "longitude": 314, // TODO: a faire
            "latitude": 314, // TODO: a faire
            "cityName": 314, // TODO: a faire
            "isDonation": isDonation,
        });
    };

    const handleSearch = async (cityName: string) => {
        const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

        const response = await axios.get(url, {
            params: {
                input: cityName,
                types: "(cities)",
                components: "country:fr",
                key: apiKey,
            },
        });

        if (response.data.status === "OK") {
            console.log(response.data.predictions);
        } else {
            console.log(`Error: ${response.data.status}`);
        }
    };

    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = {
        lat: latitude, // Latitude de Paris
        lng: longitude,  // Longitude de Paris
    };

    const apiKey = config.GOOGLE_MAPS_API_KEY;
    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            new google.maps.marker.AdvancedMarkerElement({
                position: center,
                map: mapRef.current,
            });
        }
    }, []);

    const options = {
        streetViewControl: false, // Désactive Pegman (Street View)
        mapTypeControl: false, // Désactive le contrôle du type de carte (facultatif)
        fullscreenControl: false, // Désactive le bouton de plein écran (facultatif)
    };


    return (
        <>

            <div style={{margin: "50px"}}></div>

            {/*<GoogleMapAutocomplete/>*/}


            <DebounceInput
                placeholder="Tapez quelque chose..."
                debounceTimeout={1000}
                handleDebounce={(value) => {
                    fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCoyf5B-cibub2QPUUbYKAgAMfldPWM0v8&input=decines&components=country:fr&types=(cities)")
                        .then((response) => {console.log(response)});
                }}
            />

            {/*<LoadScript googleMapsApiKey={apiKey}>*/}
            {/*    <GoogleMap*/}
            {/*        mapContainerStyle={containerStyle}*/}
            {/*        center={center}*/}
            {/*        zoom={10}*/}
            {/*        options={options}*/}
            {/*        onLoad={(map) => {*/}
            {/*            mapRef.current = map;*/}
            {/*        }}*/}
            {/*    >*/}
            {/*    </GoogleMap>*/}
            {/*</LoadScript>*/}

            <Typography variant="h4" component="h2" gutterBottom>
                Troquer mon objet
            </Typography>

            <TextField
                label="Titre de mon objet"
                variant="outlined"
                fullWidth
                value={title}
                onChange={handleChangeTitle}
                margin="normal"
            />
            <TextField
                label="Description de mon objet"
                variant="outlined"
                fullWidth
                value={description}
                onChange={handleChangeDescription}
                margin="normal"
                // error={true}
                // helperText={"TEST"}
            />
            <Autocomplete
                disablePortal
                options={aCategory}
                renderInput={(params) => <TextField {...params} label="Choix d'une catégorie"/>}
                value={category}
                onChange={handleChangeCategory}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={isDonation}
                        onChange={handleChangeDonation}
                    />
                }
                style={{display: 'flex', userSelect: "none"}}
                label="Voulez-vous donner votre objet ?"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Valider
            </Button>
        </>
    );
};

export default OfferForm;