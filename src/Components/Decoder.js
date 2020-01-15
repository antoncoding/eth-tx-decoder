import React, { Component, useState } from 'react';
import { Box, TextInput, Button, Split } from '@aragon/ui';

const Web3 = require('web3');
const rlp = require('rlp');

export default function Decoder() {
  const [hex, setTxHex] = useState('');

  // const [from, setFrom] = useState('');
  


  return (
    <>
      <Box heading={<h3> Decoder </h3>} padding={30}>
        <Split
          primary={
            <TextInput
              autofocus={true}
              wide={true}
              onChange={(event) => setTxHex(event.target.value)}
            />
          }
          secondary={<Button label='Decode' />}
        />
      </Box>
    </>
  );
}
