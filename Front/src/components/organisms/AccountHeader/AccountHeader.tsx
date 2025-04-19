import { Box, IconButton } from '@mui/material';
import { Edit, Logout } from '@mui/icons-material';
import { Avatar, Button, Typography } from '../../atoms';
import theme from '../../../theme';
import { User } from '../../../typings/Auth';

interface Props {
	profileUrl: string;
	user: User;
	onEditAvatar: () => void;
	onEditProfile: () => void;
	onLogout: () => void;
}

const AccountHeader = ({ profileUrl, user, onEditAvatar, onEditProfile, onLogout }: Props) => (
	<Box display='flex' justifyContent='space-between' width='100%'>
		<Box display='flex' alignItems='center'>
			<Box position='relative'>
				<Avatar size={"180px"} url={profileUrl} />
				<IconButton onClick={onEditAvatar} sx={{ position: "absolute", bottom: 0, right: 0 }}>
					<Edit fontSize='large' sx={{ color: 'white', backgroundColor: theme.palette.primary.main, borderRadius: '50%', border: "1px solid grey", padding: "5px" }} />
				</IconButton>
			</Box>
			<Box display='flex' flexDirection='column' alignItems='start' marginLeft='2rem' alignSelf='start'>
				<Typography variant='h4'>{user.username}</Typography>
				<Typography variant='h7'>{user.email}</Typography>
				<Typography variant='h7'>{user.phone == null || user?.phone == "" ? "Aucun numéro de téléphone renseigné" : user.phone}</Typography>
				<Box display='flex' flexDirection='column' marginTop='2rem'>
					<Button variant='contained' onClick={onEditProfile} sx={{ paddingX: '1rem', marginBottom: '0.5rem' }}>
						<Edit fontSize='inherit' sx={{ marginRight: '0.5rem' }} />
						<Typography variant='body1'>Modifier le profil</Typography>
					</Button>
					<Button color="secondary" variant='contained' onClick={onLogout} sx={{ paddingX: '1rem' }}>
						<Logout fontSize='inherit' sx={{ marginRight: '0.5rem' }} />
						<Typography variant='body1'>Se déconnecter</Typography>
					</Button>
				</Box>
			</Box>
		</Box>
		<Box display='flex' flexDirection='column' fontSize='80px'>
			<svg width="180" height="180" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M44 0C41.7909 0 40 1.79086 40 4V32C40 34.2091 41.7909 36 44 36H72C74.2091 36 76 34.2091 76 32V4C76 1.79086 74.2091 0 72 0H44ZM51 5C48.7909 5 47 6.79086 47 9V24C47 26.2091 48.7909 28 51 28H66C68.2091 28 70 26.2091 70 24V9C70 6.79086 68.2091 5 66 5H51Z" fill="#F2DC6B" />
				<path fillRule="evenodd" clipRule="evenodd" d="M4 40C1.79086 40 0 41.7909 0 44V72C0 74.2091 1.79086 76 4 76H32C34.2091 76 36 74.2091 36 72V44C36 41.7909 34.2091 40 32 40H4ZM11 45C8.79086 45 7 46.7909 7 49V64C7 66.2091 8.79086 68 11 68H26C28.2091 68 30 66.2091 30 64V49C30 46.7909 28.2091 45 26 45H11Z" fill="#F2DC6B" />
				<circle cx="58" cy="58" r="18" fill="#D99E89" />
				<circle cx="18" cy="18" r="18" fill="#D99E89" />
			</svg>
		</Box>
	</Box>
);

export default AccountHeader;
