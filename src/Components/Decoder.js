import React, { useState } from 'react';
import {
  Box,
  TextInput,
  Button,
  Split,
  AddressField,
  TransactionBadge,
  TextCopy,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Text,
} from '@aragon/ui';

const Web3 = require('web3');
const rlp = require('rlp');
const web3 = new Web3();

export default function Decoder() {
  const [hash, setHash] = useState('');
  const [hex, setTxHex] = useState(
    '0xf86e830c590f8502cb41780082f61894baf99ed5b5663329fa417953007afcc60f06f78187637aade5f00c008026a0235bbb2ffc4915daacee02a17d4527b688c853512776798756271d1a83c46ffaa079e2acba2ef48e510e9bef300e2ca79134869fa5775b2cec22eb4db09dd78164'
  );

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [nonce, setNonce] = useState(-1);
  const [gas, setGas] = useState(-1);
  const [gasPrice, setGasPrice] = useState(-1);
  const [value, setValue] = useState(-1);
  const [data, setData] = useState('0x00');

  function parseBufToInt(buf) {
    return parseInt(buf.toString('hex'), 16);
  }

  function decodeTx() {
    try {
      const b = rlp.decode(hex);

      const nonce = parseBufToInt(b[0]);
      setNonce(nonce);
      const gasPriceGWei = web3.utils.fromWei(b[1].toString('hex'), 'gwei');
      setGasPrice(gasPriceGWei);

      const gasLimit = parseBufToInt(b[2]);
      setGas(gasLimit);

      const to = web3.utils.bytesToHex(b[3]);
      setTo(web3.utils.toChecksumAddress(to));

      const value = web3.utils.fromWei(b[4].toString('hex'), 'ether'); // ETH
      setValue(value);
      const data = web3.utils.bytesToHex(b[5]);
      setData(data);

      const from = web3.eth.accounts.recoverTransaction(hex);
      setFrom(from);

      setHash(web3.utils.keccak256(hex));
    } catch (error) {
      setHash(error)
      setFrom('')
      setTo('')
      setNonce(-1)
      setGas(-1)
      setGasPrice(-1)
      setValue(-1)
      setData('0x0')
    }
  }

  return (
    <>
      <Box heading={'Raw ETHEREUM tx'} padding={50}>
        <Split
          primary={
            <>
              <TextInput
                label={'Raw'}
                value={hex}
                wide={true}
                onChange={(event) => setTxHex(event.target.value)}
              />
            </>
          }
          secondary={
            <>
              <Button label='Decode' onClick={decodeTx} />
            </>
          }
        />
        
        <Table
          header={
            <TableRow>
              <TableHeader title='detail' />
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>
              <Text>Tx Id</Text>
            </TableCell>
            <TableCell>
              { hash === '' ? '' : <TransactionBadge transaction={hash} shorten={false} /> }
              
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>From</Text>
            </TableCell>
            <TableCell>
              <AddressField address={from} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>To</Text>
            </TableCell>
            <TableCell>
              <AddressField address={to} />
              {/* <Text>{to}</Text> */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Nonce</Text>
            </TableCell>
            <TableCell>
              <Text>{ nonce !== -1 ? nonce : '' }</Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Gas</Text>
            </TableCell>
            <TableCell>
              <Text>{gas !== -1 ? gas : ''}</Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Gas Price</Text>
            </TableCell>
            <TableCell>
              <Text>{gasPrice !== -1 ? `${gasPrice} GWei` :  ''}  </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Value</Text>
            </TableCell>
            <TableCell>
              <Text>{value !== -1 ? `${value} eth` :  ''}  </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Data</Text>
            </TableCell>
            <TableCell>
              <TextCopy message={'Data field copied'} value={data} />
              {/* <Text>{data}</Text> */}
            </TableCell>
          </TableRow>
        </Table>
      </Box>
    </>
  );
}
