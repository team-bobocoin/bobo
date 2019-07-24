import axios from 'axios';
import crypto from 'crypto';
import util from 'util';

const url = 'http://172.17.0.1:1317';
const chainId = 'charitychain';

const cosmosjs = require('@cosmostation/cosmosjs');
const cosmos = cosmosjs.network(url, chainId);
const secp256k1 = require('secp256k1');

export const fromHex = (x: any) => Buffer.from(x, 'hex');

export const toHex = (x: any) => Buffer.from(x).toString('hex');

export const createKeyPair = async (): Promise<Keypair> => {
    const randomBytes = util.promisify(crypto.randomBytes);

    const bytes = await randomBytes(48);

    const token = bytes.toString('hex');

    const address = cosmos.getAddress(token);
    const privateKey = toHex(cosmos.getECPairPriv(token));

    return new Keypair(address, privateKey);
};

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

const sign = (unsigned: any, privateKey: any): any => {
    const hash = crypto
        .createHash('sha256')
        .update(JSON.stringify(sortObject(unsigned)))
        .digest('hex');

    const buf = Buffer.from(hash, 'hex');
    const signObj = secp256k1.sign(buf, privateKey);
    const signatureBase64 =  Buffer
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

export const faucet = async (keypair: Keypair) => {
    try {
        const { address } = keypair;

        const masterAddress = cosmos.getAddress('...');
        const masterKey = cosmos.getECPairPriv('...');

        const {account} = await cosmos.getAccounts(masterAddress);

        console.log('masterAddress: ', masterAddress);

        const unsigned: any = {
            account_number: account.value.account_number,
            chain_id: 'charitychain',
            sequence: account.value.sequence,
            fee: {
                amount: [],
                gas: '200000',
            },
            memo: '',
            msgs: [
                {
                    type: 'charityservice/Faucet',
                    value: {
                        amount: [
                            {
                                denom: 'crt',
                                amount: '100000',
                            },
                        ],
                        receiver: address,
                        issuer: masterAddress,
                    },
                },
            ],
        };

        const signed = sign(unsigned, masterKey);

        await axios.post(
            `${url}/txs`,
            signed,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    } catch (err) {
        console.error(err);
    }
};

export const donate = async (
    keypair: Keypair,
    to: string,
    amount: number,
    memo: string,
): Promise<any> => {
    try {
        const { address, privateKey } = keypair;

        const {account} = await cosmos.getAccounts(address);

        const unsigned: any = {
            account_number: account.value.account_number,
            sequence: account.value.sequence,
            chain_id: 'charitychain',
            fee: {
                amount: [],
                gas: '200000',
            },
            memo: memo || '',
            msgs: [
                {
                    type: 'cosmos-sdk/MsgSend',
                    value: {
                        amount: [
                            {
                                amount: amount.toString(),
                                denom: 'crt',
                            },
                        ],
                        from_address: address,
                        to_address: to,
                    },
                },
            ],
        };

        const signedTX = sign(unsigned, fromHex(privateKey));

        return await axios.post(
            `${url}/txs`,
            signedTX,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    } catch (err) {
        console.error(err);
    }
};

export const getBalances = async (address: string): Promise<any> => {
    try {
        const { data } = await axios.get(`${url}/bank/balances/${address}`);

        return data;
    } catch (err) {
        console.error(err);

        return [];
    }
};

export class Keypair {
    constructor(public address: string, public privateKey: string) {
        this.address = address;
        this.privateKey = privateKey;
    }
}
