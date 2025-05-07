import { useTheme } from '@mui/material';
import './Avatar.css';

type AvatarProps = {
    url: string|null;
    size: string;
	hasBorder?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({ url, size, hasBorder = true}) => {
	const theme = useTheme();

    return (
        <div style={{ width: size, height: size, border: hasBorder ? `solid 2px ${theme.palette.primary.main}` : "" }} className="avatar-container">
            {url && 
                <img src={url} className="avatar-image" alt="" />
            }
        </div>
    );
};

export default Avatar;
