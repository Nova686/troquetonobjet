import React, {useState} from 'react';
import {Typography, TextField, Button, Autocomplete, Switch, FormControlLabel} from "../../atoms";
import axiosService from "../../../services/AxiosService";

const OfferForm: React.FC = () => {
    // Utilisation du hook d'état pour gérer la valeur des champs du formulaire
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<{ id: number; label: string } | null>(null);
    const [isDonation, setIsDonation] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);

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
    // Fonction pour gérer le changement de valeur de la donation
    const handleChangeDonation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDonation(event.target.checked);
    };
    // Fonction pour gérer le changement de valeur de la visibilitée
    const handleChangeVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsVisible(event.target.checked);
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault()

        const data = {
            // "userId": 1, // TODO: Récupérer via Len
            // "categoryId": category?.id,
            "title": title,
            "description": description,
            "is_visible": isVisible,
            "is_donation": isDonation,
            "city_name": 'TestLand', // TODO: a faire
            "longitude": Math.random(), // TODO: a faire
            "latitude": Math.random(), // TODO: a faire
        };
        console.log('Payload:', data);
        console.log('Headers:', axiosService.defaults.headers);


        try {
            const response = await axiosService.post('offers', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                required={true}
                inputProps={{
                    maxLength: 100,
                }}
            />
            <TextField
                label="Description de mon objet"
                variant="outlined"
                fullWidth
                multiline
                value={description}
                onChange={handleChangeDescription}
                margin="normal"
                required={true}
                inputProps={{
                    maxLength: 1500,
                }}
            />
            <Autocomplete
                disablePortal
                options={aCategory}
                renderInput={(params) => <TextField {...params} label="Choix d'une catégorie"/>}
                value={category}
                onChange={handleChangeCategory}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                style={{marginTop: '16px'}}
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
            <FormControlLabel
                control={
                    <Switch
                        checked={isVisible}
                        onChange={handleChangeVisibility}
                    />
                }
                style={{display: 'flex', userSelect: "none"}}
                label="Votre objet devra être visible ?"
            />
            <Button
                variant="contained"
                color="primary"
                type={'submit'}
            >
                Valider
            </Button>
        </form>
    );
};

export default OfferForm;