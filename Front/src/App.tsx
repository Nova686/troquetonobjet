import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import {Home, Offers, CreateOffer} from './components/pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/offers/form' element={<CreateOffer/>}/>
                    <Route path='/offers' element={<Offers/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
