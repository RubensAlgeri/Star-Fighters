import { Router } from "express";

import { postBattle } from "../controllers/battleController.js";
import schemaValidator from "../middlewares/schemaMiddleware.js";
import battleSchema from "../schemas/battleSchema.js";

const battleRouter = Router();

battleRouter.post('/battle',schemaValidator(battleSchema) ,postBattle);

export default battleRouter;