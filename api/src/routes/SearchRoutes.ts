import express from 'express';
import { SearchAdvanceHandler, SearchHandler } from '../Controllers/SearchController';
import { validate } from '../middleware/validate';

const searchRoutes = express.Router();

searchRoutes.get("/", SearchHandler);
searchRoutes.get("/v2/", SearchAdvanceHandler);


export default searchRoutes;