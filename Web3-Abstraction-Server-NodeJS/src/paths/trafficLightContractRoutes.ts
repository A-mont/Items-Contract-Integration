import trafficLightController from '../controllers/trafficLightContractController.js';
import middlewares from '../middleware/jwtMiddleware.js';
import express from 'express';

export const commandRoutes = express.Router();
export const queryRoutes = express.Router();

router.post('/green', middlewares.userIsLoggedIn, trafficLightController.sendGreen);
router.post('/red', middlewares.userIsLoggedIn, trafficLightController.sendRed);
router.post('/yellow', middlewares.userIsLoggedIn, trafficLightController.sendYellow);
router.get('/state', trafficLightController.readState);

import express from 'express';
import { commands, queries } from './../contract-methods/index.js';

export const commandRoutes = express.Router();
export const queryRoutes = express.Router();

// Comando para agregar item
commandRoutes.post('/add-item', async (req, res) => {
    try {
        const { itemId, item, actorId } = req.body;
        const response = await commands.addItem(
            req.app.locals.sails,
            req.app.locals.signer,
            itemId,
            item,
            actorId
        );
        res.send(response);
    } catch (error: any) {
        console.log('Error: ', error.message);
        res.status(500).json({
            error: 'Error al enviar mensaje al contrato',
            details: (error as Error).message
        });
    }
});

// Comando para modificar item
commandRoutes.post('/modify-item', async (req, res) => {
    try {
        const { itemId, newItem } = req.body;
        const response = await commands.modifyItem(
            req.app.locals.sails,
            req.app.locals.signer,
            itemId,
            newItem
        );
        res.send(response);
    } catch (error: any) {
        console.log('Error: ', error.message);
        res.status(500).json({
            error: 'Error al enviar mensaje al contrato',
            details: (error as Error).message
        });
    }
});

// Comando para eliminar item
commandRoutes.post('/remove-item', async (req, res) => {
    try {
        const { itemId } = req.body;
        const response = await commands.removeItem(
            req.app.locals.sails,
            req.app.locals.signer,
            itemId
        );
        res.send(response);
    } catch (error: any) {
        console.log('Error: ', error.message);
        res.status(500).json({
            error: 'Error al enviar mensaje al contrato',
            details: (error as Error).message
        });
    }
});

// Consulta para todos los items
queryRoutes.get('/all-items', async (req, res) => {
    try {
        const response = await queries.allItemsQuery(req.app.locals.sails);
        res.send(response);
    } catch (error: any) {
        console.log('Error: ', error.message);
        res.status(500).json({
            error: 'Error al enviar mensaje al contrato',
            details: (error as Error).message
        });
    }
});

// Consulta por ID de item
queryRoutes.get('/item/:itemId', async (req, res) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const response = await queries.itemByIdQuery(req.app.locals.sails, itemId);
        res.send(response);
    } catch (error: any) {
        console.log('Error: ', error.message);
        res.status(500).json({
            error: 'Error al enviar mensaje al contrato',
            details: (error as Error).message
        });
    }
});
