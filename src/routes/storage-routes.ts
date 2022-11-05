import * as express from "express";
import { isValidDBReq } from './route-helpers/request-helpers';
import { logError, logInfo } from '../helpers/logger-methods';
import { apiResponse } from '../helpers/helper-methods';
import { failMessage, trueMessage } from '../constants';
import { getAllPairsInCache, syncAllPairs } from '../modules/sheets/sync';

const server = app => {
	const router = express.Router();

	app.use('/storage', router);

	router.use('/', (req, res, next) => {
		if (isValidDBReq(req)) {
			return next();
		}

		const apiMsg = 'You are not authorized to view this route.';
		logInfo(apiMsg, req);

		res.send(apiResponse(failMessage, apiMsg));
	});

	router.get('/pairs', (req, res, next) => {
		try {
			const allPairs = getAllPairsInCache()
			res.send(allPairs)
		} catch (e) {
			res.status(500).send({
				...failMessage,
				error: e,
				message: 'failure retrieving cache pairs'
			})
		}

	})

	router.get('/sync', async (req, res, next) => {
		try {
			await syncAllPairs()

			const apiMsg = 'Syncing urls';
			logInfo(apiMsg, req);
			res.send(trueMessage)
		} catch (e){
			const apiMsg = 'Syncing urls failed';

			logError(apiMsg, req);

			res.status(500).send({
				...failMessage,
				error: e,
				message: apiMsg
			})
		}
	})

	router.use('/', (req, res) => {
		const apiMsg = `This api does not support the endpoint "${req.path}". Please try a supported endpoint`;
		logError(apiMsg, req);

		res.send(apiResponse(failMessage, apiMsg));
	});
}

export default server;
