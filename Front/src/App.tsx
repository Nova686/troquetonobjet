import React from 'react';
import './App.css';
import {OfferForm} from "./components/organisms";
import {Container} from "@mui/material";

function App() {
  return (
      <Container maxWidth="sm">
        <OfferForm/>
      </Container>
  );
}

export default App;
