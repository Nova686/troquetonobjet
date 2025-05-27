import { FC, useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	useTheme,
	Grid,
	CircularProgress
} from '@mui/material';
import { Avatar } from '../../atoms';

interface AvatarSelectionModalProps {
	open: boolean;
	onClose: () => void;
	onEdit: (selected: number) => void;
	initSelected: number;
	loading: boolean;
}

const AvatarSelectionModal: FC<AvatarSelectionModalProps> = ({
	open,
	onClose,
	onEdit,
	initSelected,
	loading
}) => {
	const theme = useTheme();

	const [selected, setSelected] = useState<number>(initSelected);

	const avatars = Array.from({ length: 8 }, (_, i) => i + 1);

	const handleSubmit = () => {
		onEdit(selected);
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Choisissez une image de profil</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					{avatars.map((picNumber, index) => (
						<Grid
							key={index}
							size={{ xs: 3 }}
							onClick={() => setSelected(picNumber)}
							sx={{
								cursor: 'pointer',
								border: selected === picNumber ? '' : '2px solid transparent',
								backgroundColor: selected === picNumber ? theme.palette.secondary.main : 'none',
								borderRadius: '8px',
								overflow: 'hidden',
							}}
						>
							<Avatar
								avatarIndex={picNumber}
								size="100%"
								hasBorder={selected !== picNumber}
							/>
						</Grid>
					))}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary">
					Fermer
				</Button>
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					disabled={!selected || loading}
				>
					{loading ? <CircularProgress size={24} color="inherit" /> : 'Valider'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AvatarSelectionModal;