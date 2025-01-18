import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            favorite: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            favorite: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#F2DC6B',
        },
        secondary: {
            main: '#172601',
        },
        background: {
            default: '#172601',
        },
        custom: {
            favorite: '#fd51d4',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;