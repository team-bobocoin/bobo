import axios from 'axios';
import crypto from 'crypto';

const cosmosjs = require('@cosmostation/cosmosjs');
const secp256k1 = require('secp256k1');

const url = 'http://localhost:1317';

const chainId = 'charitychain';

describe('create account', () => {
    it('returns account', async () => {
        // const cosmos = cosmosjs.network(url, chainId);

        // const mnemonic = '...';
        // const address = cosmos.getAddress(mnemonic);
        // const privateKey = cosmos.getECPairPriv(mnemonic);
        //
        // try {
        //     const {account} = await cosmos.getAccounts(address);
        //     const to = 'cosmos10m0qnjlcnyr7dvavvq7mpzdhsuv7dv3hs6q6j9';
        //
        //     const unsigned = {
        //         account_number: account.value.account_number,
        //         chain_id: 'charitychain',
        //         fee: {
        //             amount: [
        //                 {
        //                     amount: '1',
        //                     denom: 'crt',
        //                 },
        //             ],
        //             gas: '200000',
        //         },
        //         memo: '',
        //         msgs: [
        //             {
        //                 type: 'cosmos-sdk/MsgSend',
        //                 value: {
        //                     amount: [
        //                         {
        //                             amount: '5',
        //                             denom: 'crt',
        //                         },
        //                     ],
        //                     from_address: address,
        //                     to_address: to,
        //                 },
        //             },
        //         ],
        //         sequence: account.value.sequence,
        //     };
        //
        //     const signedTX = sign(unsigned, privateKey);
        //
        //     await axios.post(
        //         `${url}/txs`,
        //         signedTX,
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         });
        // } catch (err) {
        //     console.error(err);
        // }
    });
});

describe('getBalance', () => {
    it('returns balance of account', async () => {
        // expect(await getBalance(account)).to
    });
});

const sortObject = (obj: any): any => {
    if (obj === null) { return null; }
    if (typeof obj !== 'object') { return obj; }
    if (Array.isArray(obj)) { return obj.map(sortObject); }
    const sortedKeys = Object.keys(obj).sort();
    const result: any = {};
    sortedKeys.forEach((key) => {
        result[key] = sortObject(obj[key]);
    });
    return result;
};

const getPubKeyBase64 = (privateKey: any) => {
    const pubKeyByte = secp256k1.publicKeyCreate(privateKey);
    return Buffer.from(pubKeyByte, 'binary').toString('base64');
};

const sign = (unsigned: any, privateKey: any) => {
    const hash = crypto
        .createHash('sha256')
        .update(JSON.stringify(sortObject(unsigned)))
        .digest('hex');

    const buf = Buffer.from(hash, 'hex');
    const signObj = secp256k1.sign(buf, privateKey);
    const signatureBase64 = Buffer
        .from(signObj.signature, 'binary')
        .toString('base64');

    return {
        tx: {
            msg: unsigned.msgs,
            fee: unsigned.fee,
            memo: unsigned.memo,
            signatures: [{
                pub_key: {
                    type: 'tendermint/PubKeySecp256k1',
                    value: getPubKeyBase64(privateKey),
                },
                signature: signatureBase64,
            }],
        },
        mode: 'block',
    };
};
