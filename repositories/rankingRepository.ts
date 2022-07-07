import connection from "../database.js";


async function checkRankUser(username: string) {
    return connection.query(
        `SELECT * FROM fighters WHERE username = $1`,[username.toLowerCase()]
    );
}

async function updateRanking(firstUsername:string, firstWins:number, firstLosses:number, firstDraws:number,secondUsername:string, secondWins:number, secondLosses:number, secondDraws:number) {
    console.log("🚀 ~ file: rankingRepository.ts ~ line 13 ~ updateRanking ~ firstUsername, firstWins, firstLosses, firstDraws", firstUsername, firstWins, firstLosses, firstDraws)
    connection.query(
        `UPDATE fighters SET wins=wins+$2, losses=losses+$3, draws=draws+$4 WHERE username = $1`,[firstUsername.toLowerCase(), firstWins, firstLosses, firstDraws]
    );
    connection.query(
        `UPDATE fighters SET wins=wins+$2, losses=losses+$3, draws=draws+$4 WHERE username = $1`,[secondUsername.toLowerCase(), secondWins, secondLosses, secondDraws]
    );
}

async function insertRankUser(username:string) {
    console.log("🚀 ~ file: rankingRepository.ts ~ line 21 ~ insertRankUser ~ username", username)
    return connection.query(
        `INSERT INTO fighters (username,wins,losses,draws) VALUES ($1, $2, $2, $2)`,[username.toLowerCase(), 0]
    );
}

async function getRanking() {
    return connection.query(
        `SELECT * FROM fighters ORDER BY wins DESC`
    );
}

export const rankingRepository = {
    getRanking,
    checkRankUser,
    updateRanking,
    insertRankUser
}