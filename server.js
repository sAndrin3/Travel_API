import express from 'express';
import bodyParser from 'body-parser';
import config from './src/db/config.js';
import { userRoutes } from './src/routes/tourRoutes.js';
import jwt  from 'jsonwebtoken';
import cors from 'cors'


const app = express();

app.use(cors());

app.use(bodyParser.json());

//jwt middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

userRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello Welcome to my tour API!");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});

