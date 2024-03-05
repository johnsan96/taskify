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
import passport from 'passport'
import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcrypt';
import { db } from './db/db';

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
    resave: false, 
    saveUninitialized: true, // Legt fest, ob eine "leere" Sitzung auch dann gespeichert wird, wenn sie nicht modifiziert wurde
    cookie: {
        path    : '/',
        httpOnly: false,
        maxAge  : 24*60*60*1000
      },
}));

app.use(passport.initialize());
app.use(passport.session());


// Typdefinition für die Struktur der row-Objekte
interface UserRow {
    id: number;
    username: string;
    password: string;
}

passport.use(new BasicStrategy(
    function (username, password, done) {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row: UserRow) => {
            if (err) { return done(err); }
            if (!row) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, row.password, (error, result) => {
                if (error) { return done(error); }
                if (result) {
                    return done(null, row);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
    }
));



passport.serializeUser(function (user: any, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) { return done(err); }
        done(null, row);
    });
});

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