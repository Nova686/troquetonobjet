import {useState, FC, ChangeEvent, FormEvent, useEffect} from 'react';
import {Typography, TextField, Button, Autocomplete, Switch, FormControlLabel} from "../../atoms";
import axiosService from "../../../services/AxiosService";
import {AxiosError, AxiosResponse} from "axios";
import {Category, OfferFormCreate} from "../../../typings/Offer";
import {useTheme} from "@mui/material/styles";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../../contexts/AuthContext";
import {DeleteButton} from "../../molecules";
import { Box } from '@mui/material';
// import { debounce } from '@mui/material/utils'

const OfferForm: FC = () => {
    const offer = useLocation().state?.offer;

    const [title, setTitle] = useState<string>(offer?.title ?? '');
    const [description, setDescription] = useState<string>(offer?.description ?? '');
    const [category, setCategory] = useState<Category | null>(null);
    const [subCategory, setSubCategory] = useState<{ id: number; label: string } | null>(null);
    const [isDonation, setIsDonation] = useState<boolean>(offer?.isDonation ?? false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [errorTitle, setErrorTitle] = useState<string>('');
    const [errorDescription, setErrorDescription] = useState<string>('');
    const [errors, setErrors] = useState<string>('');
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [subCategories, setSubCategories] = useState<Array<Object>>([]);
    const [cities, setCities] = useState<Array<Object>>([]);
    const [cityName, setCityName] = useState<string>('');
    const [placeId, setPlaceId] = useState<string>('');

    const theme = useTheme();
    const { isConnected, user } = useAuth();

    const handleChangeCategory = (event: ChangeEvent<{}>, newValue: any | null) => {
        setCategory(newValue);
        setSubCategories(newValue ? newValue.subCategories : []);
        setSubCategory(null);
    };

    const changeCityName = (value: string) => {
        setCityName(value);

        if (value.length > 2) {
            axiosService.get(`/auto-complete?searchTerm=${value}`).then((res) => {
                setCities(res.data.map((city: any) => { return { id: city.id, label: city.name }}));
            })
        } else {
            setCities([])
        }
    }

    useEffect(() => {
        axiosService.get('/category/all/1').then((res) => {
            setCategories(res.data.categories)
        });
    }, []);

    // Fonction pour gérer le clic sur le bouton "Valider"
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data : OfferFormCreate = {
            userId: user?.id,
            subCategoryId: subCategory ? subCategory.id : null,
            title: title,
            description: description,
            isVisible: isVisible,
            isDonation: isDonation,
            cityName: cityName,
            placeId: placeId
        };

        try {
            const response: AxiosResponse = await axiosService.post('offers', data);
            setErrors('');
            setErrorTitle('');
            setErrorDescription('');

            if (response.status === 200) {
                console.log('Redirige sur la liste des offres pignouf') // TODO: redirection liste des offres
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                // Accéder aux propriétés spécifiques à l'erreur Axios
                const aError = error.response?.data.errors ?? error.message;

                for (const key in aError) {
                    switch (key) {
                        case 'title':
                            setErrorTitle(aError[key].join("<br />")); // TODO: revoir en flex pour Célien
                            break;
                        case 'description':
                            setErrorDescription(aError[key].join("<br />")); // TODO: revoir en flex pour Célien
                            break;
                        default:
                            setErrors(aError[key]);
                            break;
                    }
                }
            } else {
                console.error('Erreur inconnue:', error);
                setErrors('Une erreur à été retournée, veuillez-rééssayer.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h2" gutterBottom color={theme.palette.primary.main}>
                    Déposer une annonce
                </Typography>
                { isConnected() && offer && <DeleteButton url={`/offers/${offer.id}`} /> }
            </Typography>

            <div style={{ textAlign: 'center', color: 'white' }}>
                Choisis la nature de la transaction
                <Box display="flex" justifyContent="center" gap={8} marginTop={1} color="#B1CA00" fontWeight="bold" fontSize={20}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ background: !isDonation ? '#F8EAA3' : 'white', borderRadius: '8px', width: '150px', height: '150px' }}
                         onClick={() => setIsDonation(false)}>
                        <img src="/Images/trade.svg" width="72" alt="trade"/>
                        Troc
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ background: isDonation ? '#F8EAA3' : 'white', borderRadius: '8px', width: '150px', height: '150px' }}
                         onClick={() => setIsDonation(true)}>
                        <img src="/Images/donation.svg" width="72" alt="donation"/>
                        Don
                    </Box>
                </Box>
            </div>
            <TextField
                label="Titre de mon objet"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                margin="normal"
                required={true}
                inputProps={{
                    maxLength: 100,
                }}
                errorText={errorTitle} />
            <TextField
                label="Description de mon objet"
                variant="outlined"
                fullWidth
                multiline
                value={description}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
                margin="normal"
                required={true}
                inputProps={{
                    maxLength: 1500,
                }}
                errorText={errorDescription} />
            <Box display="flex" gap={4} marginTop={4}>
                <Autocomplete
                    disablePortal
                    options={categories}
                    renderInput={(params) => <TextField {...params} label="Choix d'une catégorie"/>}
                    value={category}
                    onChange={handleChangeCategory}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    fullWidth />
                <Autocomplete
                    disablePortal
                    options={subCategories}
                    renderInput={(params) => <TextField {...params} label="Choix d'une sous-catégorie"/>}
                    value={subCategory}
                    onChange={(event, newValue) => setSubCategory(newValue)}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    fullWidth />
            </Box>
            <FormControlLabel
                control={
                    <Switch
                        checked={isVisible}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setIsVisible(event.target.checked)}
                    />
                }
                sx={{display: 'flex', userSelect: "none", color: theme.palette.primary.main}}
                label="Votre objet devra être visible ?" />
            <Autocomplete
                    disablePortal
                    options={cities}
                    renderInput={(params) => <TextField {...params} label="Choix d'une ville"/>}
                    value={cityName}
                    onInputChange={(e, newValue) => changeCityName(newValue)}
                    onChange={((e, newValue) => setPlaceId(newValue))}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    fullWidth />
            <Button
                variant="contained"
                color="primary"
                type={'submit'}>
                Valider
            </Button>
            {!!errors && (
                <Typography variant="body1" type={'error'} style={{ marginTop: '16px' }}>
                    {errors}
                </Typography>
            )}
        </form>
    );
};

export default OfferForm;