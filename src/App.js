import React, { useState } from 'react';
import Decoder from './Components/Decoder';

import { Main, Header } from '@aragon/ui';

import './App.css';

function App() {
  
  return (
    <Main>
      <Header />
      <Decoder />
    </Main>
  );
}

export default App;
