import { ChangeEvent, FC, useState } from 'react';
import { Wish } from '../../../typings/Offer';
import { TextField } from '../../atoms';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTheme} from "@mui/material/styles";
import axiosService from '../../../services/AxiosService';
import { useToast } from '../../../contexts/ToastContext';

interface WishOfferFormProps {
    offerId: number;
    wishs: Array<Wish>;
}

const WishOfferForm: FC<WishOfferFormProps> = ({ offerId, wishs }) => {
    const theme = useTheme();
    const { showToast } = useToast();
    const [newWish, setNewWish] = useState<string>('')

    const addWish = () => {
        if (!newWish) return
        axiosService.post(`/offers/${offerId}/wishs`, {text: newWish}).then((res) => {
            wishs.push(res.data.wish);
            setNewWish('');

            showToast({
                message: "Souhait ajouté avec succès",
                position: { vertical: "bottom", horizontal: "right" },
                type: 'success'
            });
        })
    }

    const removeWish = (id: number) => {
        axiosService.delete(`/offers/wishs/${id}`).then(() => {
            wishs.splice(wishs.findIndex(w => w.id === id), 1)

            showToast({
                message: "Souhait retiré avec succès",
                position: { vertical: "bottom", horizontal: "right" },
                type: 'success'
            });
        })
    }

    return (
        <div>
            {wishs.map((wish, index) => 
                <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', alignItems: 'center'}}>
                    <TextField
                        label={`Souhait n°${index + 1}`}
                        variant="outlined"
                        fullWidth
                        multiline
                        value={wish.text}
                        margin="normal" />
                        <DeleteIcon sx={{ color: theme.palette.secondary.main, cursor: 'pointer', marginTop: '16px' }} onClick={() => removeWish(wish.id)} />
                </div>
            )}
            <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', alignItems: 'center'}}>
                <TextField
                    label={`Souhait n°${wishs.length + 1}`}
                    variant="outlined"
                    fullWidth
                    multiline
                    value={newWish}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setNewWish(event.target.value)}
                    margin="normal" />
                <AddIcon sx={{ color: theme.palette.primary.main, cursor: 'pointer', marginTop: '16px' }} onClick={addWish} />
            </div>
        </div>
    )
}

export default WishOfferForm;