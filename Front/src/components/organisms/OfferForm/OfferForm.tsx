import {useState, FC, ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import {Typography, TextField, Button, Autocomplete, Switch, FormControlLabel} from "../../atoms";
import axiosService from "../../../services/AxiosService";
import {AxiosError} from "axios";
import {Category, Offer, OfferFormCreate, Wish} from "../../../typings/Offer";
import {useTheme} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../contexts/AuthContext";
import {DeleteButton} from "../../molecules";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useToast } from '../../../contexts/ToastContext';
import WishOfferForm from '../WishOfferForm/WishOfferForm';
// import { debounce } from '@mui/material/utils'

const OfferForm: FC = () => {
    const offerId = useParams().id || null;

    const theme = useTheme();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { isConnected, user } = useAuth();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<Category|null>(null);
    const [subCategory, setSubCategory] = useState<{ id: number; label: string } | null>(null);
    const [isDonation, setIsDonation] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [cityName, setCityName] = useState<string|null>(null);
    const [wishs, setWishs] = useState<Array<Wish>>([]);
    
    const [cities, setCities] = useState<Array<Object>>([]);
    const [placeId, setPlaceId] = useState<string|null>(null);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [subCategories, setSubCategories] = useState<Array<Object>>([]);

    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [files, setFiles] = useState<Array<File>>([]);
    const [images, setImages] = useState<Array<string>>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChangeCategory = (event: ChangeEvent<{}>, newValue: any | null) => {
        setCategory(newValue);
        setSubCategories(newValue ? newValue.subCategories : []);
        setSubCategory(null);
    };

    const handleChangeFiles = (e: any) => {
        setFiles(files => {
            return [...files, ...Array.from(e.target.files as Array<File>)]
        })
    }

    const changeCityName = (value: string) => {
        setCityName(value);

        if (value.length > 2) {
            axiosService.get(`/auto-complete?searchTerm=${value}`).then((res) => {
                setCities(res.data.map((city: any) => { return { id: city.placeId, label: city.name }}));
            })
        } else {
            setCities([]);
        }
    }

    const deleteFiles = (index: number) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    }

    useEffect(() => {
        axiosService.get('/category/all/1').then((res) => {
            setCategories(res.data.categories)
        });
        if (offerId) {
            setIsLoading(true)
            axiosService.get(`/offers/${offerId}`).then((res) => {
                const offer: Offer = res.data
                
                setTitle(offer.title);
                setDescription(offer.description);
                setCategory(offer.category);
                setSubCategory(offer.subCategory);
                setIsDonation(offer.isDonation);
                setIsVisible(offer.isVisible);
                setCityName(offer.cityName);
                const img = offer.images;
                if (offer.mainImage) {
                    img.push(offer.mainImage);
                }
                setImages(img);
                setWishs(offer.wishs);
                setIsLoading(false);
            });
        }
    }, []);

    const handleIsVisible = (event: ChangeEvent<HTMLInputElement>) => {
        setIsVisible(event.target.checked)
    }

    // Fonction pour gérer le clic sur le bouton "Valider"
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const data : OfferFormCreate = {
            userId: user?.id,
            subCategoryId: subCategory ? subCategory.id : null,
            title: title,
            description: description,
            isVisible: isVisible || false,
            isDonation: isDonation,
            cityName: cityName,
            placeId: placeId
        };

        try {
            let offerIdForm: string = ''
            if (offerId) {
                await axiosService.put(`offers/${offerId}`, data);
                offerIdForm = offerId.toString()
            } else {
                const res = await axiosService.post('offers', data);
                offerIdForm = res.data.offer.id
            }
            setErrors({});
            if (files.length) {
                let order = 0;
                for (const file of files) {
                    const form = new FormData();
                    
                    form.append('fichier', file)
                    form.append('offer_id', offerIdForm)
                    form.append('order', order.toString())
                    await axiosService.post('offers/upload', form, {headers: { 'Content-Type': 'multipart/form-data' }} ) // header multi
                    order++;
                }
            }
            showToast({
                message: "Annonce modifié avec succès",
                position: { vertical: "bottom", horizontal: "right" },
                type: 'success'
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                // Accéder aux propriétés spécifiques à l'erreur Axios
                setErrors(error.response?.data.errors ?? {});
            } else {
                console.error('Erreur inconnue:', error);
                // setErrors('Une erreur à été retournée, veuillez-rééssayer.');
                // TODO: Remplacer par un toast
            }
        }
    };

    if (isLoading) {
        return <div>Chargement...</div>
    }
    return (
        <>
            <form onSubmit={handleSubmit} style={{ marginBottom: 64 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" component="h2" gutterBottom color={theme.palette.primary.main}>
                        Déposer une annonce
                    </Typography>
                    {offerId && isConnected() && 
                        <div>
                            <Button variant="contained" color="primary" sx={{ marginRight: 4 }} onClick={() => navigate(`/offers/${offerId}`)}>
                                Voir mon offre
                            </Button>
                            <DeleteButton url={`/offers/${offerId}`} callable={() => navigate('/offers')} />
                        </div>
                    }
                </div>

                <div style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
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
                    required
                    inputProps={{
                        maxLength: 100,
                    }}
                    errorText={errors.title ? errors.title[0] : ''} />
                <TextField
                    label="Description de mon objet"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={description}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
                    margin="normal"
                    required
                    inputProps={{ maxLength: 1500 }}
                    errorText={errors.description ? errors.description[0] : ''} />
                <Box display="flex" gap={4} marginTop={2}>
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
                <Autocomplete
                        disablePortal
                        options={cities}
                        renderInput={(params) => <TextField {...params} label="Choix d'une ville"/>}
                        value={cityName}
                        onInputChange={(e, newValue) => changeCityName(newValue)}
                        onChange={((e, newValue) => setPlaceId(newValue.id ?? null))}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        noOptionsText="Tapez le nom de la ville"
                        sx={{ marginTop: 2 }}
                        fullWidth />
                <Box display="flex" justifyContent="center" gap={2} marginTop={4} marginBottom={4}>
                    {((files && files.length > 0) || images.length > 0) && 
                        <Box display="flex" gap={2} height="200px">
                            {images.map((image, index) => 
                                <div key={index} style={{ position: 'relative' }}>
                                    <img src={image} alt="preview" height="100%" />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: '#00000080', color: 'white', padding: '0 4px', display: 'flex', justifyContent: 'end' }}>
                                        <DeleteIcon onClick={() => deleteFiles(index)} sx={{ fontSize: '16px', color: theme.palette.secondary.main, cursor: 'pointer' }} />
                                    </div>
                                </div>
                            )}
                            {files.map((file, index) => 
                                <div key={index} style={{ position: 'relative' }}>
                                    <img src={URL.createObjectURL(file)} alt="preview" height="100%" />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: '#00000080', color: 'white', padding: '0 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        { file.name }
                                        <DeleteIcon onClick={() => deleteFiles(index)} sx={{ fontSize: '16px', color: theme.palette.secondary.main, cursor: 'pointer' }} />
                                    </div>
                                </div>
                            )}
                        </Box>
                    }
                    <label htmlFor="file" style={{ width: '100%' }}>
                        <div style={{ backgroundColor: theme.palette.custom.input, width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', border: '1px solid white', cursor: 'pointer' }}>
                            <div style={{ border: `2px solid ${theme.palette.primary.main}`, color: 'white', padding: '4px', borderRadius: '4px' }}>
                                + Ajouter des photos
                            </div>
                        </div>
                        <input id="file" accept="image/*" ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleChangeFiles} />
                    </label>
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={!!isVisible}
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={handleIsVisible} />
                        }
                        sx={{ display: 'flex', userSelect: "none", color: theme.palette.primary.main }}
                        label="Votre annonce devra-t-elle être visible dès la publication ?" />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">
                        Publier mon annonce
                    </Button>
                </Box>
            </form>
            <Typography variant="h4" component="h2" gutterBottom color={theme.palette.primary.main}>
                Ce que vous souhaitez en retour
            </Typography>
            <div style={{ width: '70%', marginBottom: 32 }}>
                {offerId && 
                    <WishOfferForm offerId={parseInt(offerId)} wishs={wishs} />
                }
            </div>
        </>
    );
};

export default OfferForm;