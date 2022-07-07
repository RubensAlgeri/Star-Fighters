import { rankingRepository } from "../repositories/rankingRepository.js";
import axios, { Axios } from "axios";

export async function checkBattle(firstUser:string, secondUser:string){

    const user1 = await axios.get(`https://api.github.com/users/${firstUser}/repos`)
    if(user1.data.message === "Not Found") throw{type:"404"}
    const user2 = await axios.get(`https://api.github.com/users/${secondUser}/repos`)
    if(user2.data.message === "Not Found") throw{type:"404"}

    const rankFirstUser = await rankingRepository.checkRankUser(firstUser)
    if(rankFirstUser.rows.length===0) await rankingRepository.insertRankUser(firstUser)

    const rankSecondUser = await rankingRepository.checkRankUser(secondUser)
    if(rankSecondUser.rows.length===0) await rankingRepository.insertRankUser(secondUser)


    let firstUserStarGazers=0;
    user1.data.forEach(project=>{
        firstUserStarGazers += project.stargazers_count;
    })

    let secondUserStarGazers=0;
    user2.data.forEach(project=>{
        secondUserStarGazers += project.stargazers_count;
    })

    if(firstUserStarGazers>secondUserStarGazers) {

        await rankingRepository.updateRanking(firstUser,1,0,0,secondUser,0,1,0)

        return {
            winner: firstUser,
            loser: secondUser,
            draw: false
        }
    }

    if(firstUserStarGazers<secondUserStarGazers) {
        
        await rankingRepository.updateRanking(firstUser,0,1,0,secondUser,1,0,0)

        return {
            winner: secondUser,
            loser: firstUser,
            draw: false
        }
    }

    await rankingRepository.updateRanking(firstUser,0,0,1,secondUser,0,0,1)

    return {
        winner: null,
        loser: null,
        draw: true
    }

}