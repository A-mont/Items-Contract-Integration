import { Sails } from "sails-js";

export const allItemsQuery = (sails: Sails): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await sails
                .services
                .TouryItems
                .queries
                .AllItemsQuery();
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
};

export const itemByIdQuery = (sails: Sails, itemId: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await sails
                .services
                .TouryItems
                .queries
                .ItemByIdQuery(itemId);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
};