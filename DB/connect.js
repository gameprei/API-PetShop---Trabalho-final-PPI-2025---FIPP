import mysql from "mysql2/promise";

export default async function Connect() {
    if(global.poolConnection){
        return await global.poolConnection.getConnection();
    }
    else{
        global.poolConnection = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "0jjx@Z$35kTvR3",
            database: "petshopdb",
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        console.log("Conectado ao MySQL");
        return await global.poolConnection.getConnection();
    }
}