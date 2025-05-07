import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import {Home, Offers, Authentication, Conversations, DetailOffer, Favorite, Account} from './components/pages';
import ProtectedRoute from './components/shared/ProtectedRoute';
import theme from './theme';
import {ThemeProvider, CssBaseline, Box} from "@mui/material";
import {ToastProvider} from "./contexts/ToastContext";
import { OfferForm } from './components/organisms';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ToastProvider>
                <CssBaseline/> {/* Applique les styles par défaut de MUI */}
                <Box sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Layout/>}>
                                <Route index element={<Home/>}/>
                                <Route path='/auth/:type' element={<Authentication/>}/>
                                <Route path='/offers' element={<Offers/>}/>
                                <Route path='/profile' element={
                                    <ProtectedRoute>
                                        <Account/>
                                    </ProtectedRoute>
                                }/>
                                <Route path='/conversations/:id?' element={
                                    <ProtectedRoute>
                                        <Conversations/>
                                    </ProtectedRoute>
                                }/>
                                <Route path='/favorite' element={
                                    <ProtectedRoute>
                                        <Favorite/>
                                    </ProtectedRoute>
                                }/>

                                <Route path='/offers/:id/edit' element={<OfferForm/>}/>
                                <Route path='/offers/create' element={<OfferForm/>}/>
                                <Route path='/offers/:id' element={<DetailOffer/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
