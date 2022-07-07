import { Request, Response } from "express";
import * as battleServices from '../services/battleServices.js';

export async function postBattle(req:Request, res:Response) {
        const { firstUser, secondUser } : {firstUser: string, secondUser: string} = req.body;

        const response = await battleServices.checkBattle(firstUser, secondUser)

        res.send(response);
};