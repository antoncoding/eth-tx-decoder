import React, { useState } from 'react';
import Decoder from './Components/Decoder';

import AragonUILogo from './aragonui-logo.png';
import {
  Main,
  Header,
  SidePanel,
  Box,
  ButtonBase,
  Button,
  AddressField,
  PublicUrl,
} from '@aragon/ui';

import './App.css';

function App() {
  const [sidePanelOpened, setSidePanelOpened] = useState(false);

  return (
    <Main>
      <Header
        primary={<></>}
        secondary={
          <Button
            // mode='strong'
            label='Learn More'
            onClick={() => {
              setSidePanelOpened(true);
            }}
          />
        }
      />
      <Decoder />
      <SidePanel opened={sidePanelOpened} onClose={() => setSidePanelOpened(false)}>
        <div style={{ padding: 20, fontSize: 15 }}> Powered By </div>

        <Box>
          <ButtonBase
            onClick={() => {
              window.open('https://ui.aragon.org/', '_blank');
            }}
            showFocusRing={false}
          >
            <div style={{ paddingLeft: '5%', alignContent: 'center', alignItems: 'center' }}>
              <img width={300} src={AragonUILogo} alt='aragon-ui'></img>
            </div>
          </ButtonBase>
        </Box>

        <div style={{  padding: 20, paddingTop:60, fontSize: 15 }}> Donate </div>
        <AddressField address={'0x81bb32e4A7e4d0500d11A52F3a5F60c9A6Ef126C'} />

        <div style={{ padding: 20, fontSize: 15 }}> Source Code </div>
        <ButtonBase
            onClick={() => {
              window.open('https://github.com/antoncoding/eth-tx-decoder', '_blank');
            }}
            showFocusRing={false}
          >
            <Box>
            Visit GitHub
            </Box>
            
          </ButtonBase>
      </SidePanel>
    </Main>
  );
}

export default App;
