import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routes/usersRoute'
import taskRouter from './routes/taskRoute';
import loginRouter from './routes/loginRoute';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './db/db'
import session from 'express-session';

dotenv.config();

const app: Express = express();

const port = process.env.PORT;

app.use(cookieParser());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true }));

app.use(express.json());

// Session-Middleware konfigurieren
app.use(session({
    secret: 'geheimesGeheimnis', // Geheimnis zur Signierung von Session-Cookies
    resave: false, // Legt fest, ob die Sitzung bei jedem Antrag erneut gespeichert werden soll
    saveUninitialized: false, // Legt fest, ob eine "leere" Sitzung auch dann gespeichert wird, wenn sie nicht modifiziert wurde
    cookie: {
        path    : '/',
        httpOnly: false,
        maxAge  : 24*60*60*1000
      },
}));

app.use(userRouter);
app.use(loginRouter);
app.use(taskRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
    testSequelize();
});

async function testSequelize() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established with sequelize successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 