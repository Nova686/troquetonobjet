import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";

interface EditAccountModalProps {
	open: boolean;
	onClose: () => void;
	username: string;
	phone: string | null | undefined;
	onEdit: (username: string, phone: string) => void;
	loading: boolean;
}

const EditAccountModal: FC<EditAccountModalProps> = ({ open, onClose, username, phone, onEdit, loading }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onEdit(currentUsername, currentPhone);
	}
	const [currentUsername, setCurrentUsername] = useState(username);
	const [currentPhone, setCurrentPhone] = useState<string>(phone ?? "");

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Modifier les informations du compte</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Nom"
						type="text"
						fullWidth
						required
						value={currentUsername}
						onChange={(e) => setCurrentUsername(e.target.value)}
					/>
					<TextField
						margin="dense"
						label="Téléphone"
						type="tel"
						fullWidth
						value={currentPhone}
						onChange={(e) => setCurrentPhone(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="secondary">
						Fermer
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}
					>
						{loading ? <CircularProgress size={24} color="inherit" /> : 'Valider'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default EditAccountModal;