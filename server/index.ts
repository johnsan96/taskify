import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routes/usersRoute'
import taskRouter from './routes/taskRoute';
import loginRouter from './routes/loginRoute';
import taskAssigneeRouter from './routes/taskAssignee';
import projectTaskRouter from './routes/projectTaskRoute';
import projectUserRouter from './routes/projectUserRoute';
import projectRouter from './routes/projectRoute';
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

/* app.use(cors({ credentials: true })); */

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json());

// Session-Middleware konfigurieren
app.use(session({
    secret: 'geheimesGeheimnis', // Geheimnis zur Signierung von Session-Cookies
    resave: false,
    saveUninitialized: false, // Legt fest, ob eine "leere" Sitzung auch dann gespeichert wird, wenn sie nicht modifiziert wurde
    cookie: {
        /*  path: '/',
         httpOnly: false, */
        maxAge: 24 * 60 * 60 * 1000
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

app.use(userRouter);
app.use(loginRouter);
app.use(taskRouter);
app.use(taskAssigneeRouter);
app.use(projectRouter);
app.use(projectTaskRouter);

app.use(projectUserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
    testSequelize();
});

app.get('/secrets', (req: Request, res: Response) => {
    console.log("here is the authentificated user: " + JSON.stringify(req.user));
    console.log(req.session)
    if (req.isAuthenticated())
        res.send(JSON.stringify(req.user))
    else
        res.status(401).send("not authorized")

});

async function testSequelize() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established with sequelize successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            // Don't redirect, just print text
            res.send('Logged out');
        });
    });
});

passport.use(new BasicStrategy(
    function (username, password, done) {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row: UserRow) => {
            if (err) { return done(err); }
            if (!row) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const user = row;
            const storedHashedPassword = row.password;
            if (!storedHashedPassword) {
                return done(null, false, { message: 'Password not found.' });
            }
            bcrypt.compare(password, storedHashedPassword, (error, result) => {
                if (error) { return done(error); }
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
    }
));


passport.serializeUser(function (user: UserRow, done) {
    console.log("serialize: " + JSON.stringify(user))
    done(null, user.id); // Nur die ID des Benutzers in der Session speichern
});

passport.deserializeUser(function (id, done) {
    console.log('Deserialize User called with id:', id);
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row: UserRow) => {
        if (err) {
            console.error('Error while deserializing user:', err);
            return done(err);
        }
        if (!row) {
            console.error('User not found with id:', id);
            return done(null, false);
        }
        console.log('User deserialized:', row);
        done(null, row); // Benutzer erfolgreich geladen
    });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 