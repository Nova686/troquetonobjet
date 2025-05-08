import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import {Home, Offers, CreateOffer, Authentication, Conversations, DetailOffer, Favorite, Account} from './components/pages';
import {Users as AdminUsers, Categories as AdminCategories, Offers as AdminOffers} from './components/pages/admin'
import ProtectedRoute from './components/shared/ProtectedRoute';
import theme from './theme';
import {ThemeProvider, CssBaseline, Box} from "@mui/material";
import {ToastProvider} from "./contexts/ToastContext";

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
                                <Route path='/offers/form' element={<CreateOffer/>}/>
                                <Route path='/offers/:id' element={<DetailOffer/>}/>

                                {/* Page administration */}
                                <Route path='/admin/users' element={
                                    <ProtectedRoute adminRoute={true}>
                                        <AdminUsers/>
                                    </ProtectedRoute>
                                }/>
                                <Route path='/admin/categories' element={
                                    <ProtectedRoute adminRoute={true}>
                                        <AdminCategories/>
                                    </ProtectedRoute>
                                }/>
                                <Route path='/admin/offers' element={
                                    <ProtectedRoute adminRoute={true}>
                                        <AdminOffers/>
                                    </ProtectedRoute>
                                }/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
