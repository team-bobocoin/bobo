import { createKeyPair, faucet, getBalances } from './cosmos.service';

describe('CosmosService', () => {
    describe('createKeyPair', () => {
        it('returns keyPair', async () => {
            const keyPair = await createKeyPair();

            expect(keyPair.address.length).toBe(45);
            expect(keyPair.privateKey.length).toBe(64);
        });
    });

    describe('faucet', () => {
        it('increase my tokens count', async () => {
            jest.setTimeout(20000);
            const keyPair = await createKeyPair();

            await faucet(keyPair);

            const balances = await getBalances(keyPair.address);

            expect(balances.length).toBe(1);
        });
    });

    describe('getBalances', () => {
        it('returns balances', async () => {
            const {address} = await createKeyPair();

            const balances = await getBalances(address);

            expect(balances.length).toBe(0);
        });
    });
});
