import { useTheme } from '@mui/material';
import './Avatar.css';

type AvatarProps = {
	avatarIndex: number | null;
    size: string;
	hasBorder?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({ avatarIndex, size, hasBorder = true}) => {
	const theme = useTheme();

    return (
        <div style={{ width: size, height: size, border: hasBorder ? `solid 2px ${theme.palette.primary.main}` : "" }} className="avatar-container">
			<img src={avatarIndex == null ? '/Images/avatar.jpg' : `/Images/Avatars/${avatarIndex}.webp`} className="avatar-image" alt="" />
        </div>
    );
};

export default Avatar;
