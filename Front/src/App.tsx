import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import OfferForm from './components/organisms/OfferForm/OfferForm';
import Home from './components/pages/Home/Home';
import { Authentication } from './components/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/form' element={<OfferForm />} />
          <Route path='/auth' element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
