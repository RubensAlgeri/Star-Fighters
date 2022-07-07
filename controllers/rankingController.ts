import { Request, Response } from "express";
import * as rankingServices from '../services/rankingServices.js';

export async function getRanking(req:Request, res:Response) {
        const rank = await rankingServices.getRanking()

        res.send(rank);
};
