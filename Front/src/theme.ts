import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            danger: string;
        };
    }

    interface PaletteOptions {
        custom?: {
            danger?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#F2DC6B',
        },
        secondary: {
            main: '#D99E89',
        },
        background: {
            default: '#172601',
        },
        custom: {
            danger: '#FF0000',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
