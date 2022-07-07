import { rankingRepository } from "../repositories/rankingRepository.js";

export async function getRanking(){


    const {rows:rank} = await rankingRepository.getRanking();
    return rank;
}