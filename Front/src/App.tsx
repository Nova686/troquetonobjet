import React from 'react';
import './App.css';
import {OfferForm} from "./components/organisms";
import {Container} from "@mui/material";
import AccountPage from './account-page';

function App() {
  return (
      <Container maxWidth="sm">
        <AccountPage/>
      </Container>
  );
}

export default App;
