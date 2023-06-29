import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const { PORT, SQL_USER, SQL_PWD, SQL_DB, SQL_SERVER, JWT_SECRET } = process.env;

// const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, 'PORT is required');


const config = {
    port: PORT,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options: {
            encrypt: true,
            trustServerCertificate: false,
            pool: {
                max:20,
                min:0,
                idleTimeout: 30000,
            }, 
        },
    },
    jwt_secret: JWT_SECRET
};
export default config;