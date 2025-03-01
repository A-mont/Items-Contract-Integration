import { Sails } from "sails-js";
import { KeyringPair } from '@polkadot/keyring/types';

export const addItem = (sails: Sails, signer: KeyringPair, itemId: number, item: any, actorId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const transaction = await sails
                .services
                .TouryItems
                .functions
                .AddItemService(itemId, item, actorId)
                .withAccount(signer)
                .calculateGas();

            const { blockHash, response } = await transaction.signAndSend();
            console.log({ blockHash });

            const contractResponse = await response();
            resolve(contractResponse);
        } catch (e) {
            reject(e);
        }
    });
};

export const modifyItem = (sails: Sails, signer: KeyringPair, itemId: number, newItem: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const transaction = await sails
                .services
                .TouryItems
                .functions
                .ModifyItemService(itemId, newItem)
                .withAccount(signer)
                .calculateGas();

            const { blockHash, response } = await transaction.signAndSend();
            console.log({ blockHash });

            const contractResponse = await response();
            resolve(contractResponse);
        } catch (e) {
            reject(e);
        }
    });
};

export const removeItem = (sails: Sails, signer: KeyringPair, itemId: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const transaction = await sails
                .services
                .TouryItems
                .functions
                .RemoveItemService(itemId)
                .withAccount(signer)
                .calculateGas();

            const { blockHash, response } = await transaction.signAndSend();
            console.log({ blockHash });

            const contractResponse = await response();
            resolve(contractResponse);
        } catch (e) {
            reject(e);
        }
    });
};




