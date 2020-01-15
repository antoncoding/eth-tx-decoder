import React, { useState } from 'react';
import Decoder from './Components/Decoder';

import { Main, Header } from '@aragon/ui';

import './App.css';

function App() {
  const [sidePanelOpened, setSidePanelOpened] = useState(false);

  return (
    <Main>
      <Header />
      <Decoder />
    </Main>
  );
}

export default App;
