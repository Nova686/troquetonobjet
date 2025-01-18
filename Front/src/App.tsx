import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import {Home, Offers, CreateOffer} from './components/pages';
import {ThemeProvider, CssBaseline, Box} from "@mui/material";
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/* Applique les styles par défaut de MUI */}
            <Box sx={{minHeight: '100vh', backgroundColor: 'background.default'}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path='/offers/form' element={<CreateOffer/>}/>
                            <Route path='/offers' element={<Offers/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
