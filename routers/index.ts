import { Router } from "express";
import "express-async-errors"
import errorHandlingMiddleware from "../middlewares/errorHandler.js";

import battleRouter from './battleRouter.js';
import rankingRouter from './rankingRouter.js';

const router = Router();

router.use(rankingRouter);
router.use(battleRouter);
router.use(errorHandlingMiddleware)

export default router;