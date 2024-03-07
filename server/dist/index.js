"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./db/db");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_http_1 = require("passport-http");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_2 = require("./db/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.json());
// Session-Middleware konfigurieren
app.use((0, express_session_1.default)({
    secret: 'geheimesGeheimnis',
    resave: false,
    saveUninitialized: false, // Legt fest, ob eine "leere" Sitzung auch dann gespeichert wird, wenn sie nicht modifiziert wurde
    /*   cookie: {
          path: '/',
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000
      }, */
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(usersRoute_1.default);
app.use(loginRoute_1.default);
app.use(taskRoute_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
    testSequelize();
});
app.get('/secrets', (req, res) => {
    console.log("here is the authentificated user: " + req.user);
    if (req.isAuthenticated())
        res.send(req.user);
    else
        res.send("not authorized");
});
async function testSequelize() {
    try {
        await db_1.sequelize.authenticate();
        console.log('Connection has been established with sequelize successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
passport_1.default.use(new passport_http_1.BasicStrategy(function (username, password, done) {
    db_2.db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        const user = row;
        const storedHashedPassword = row.password;
        if (err) {
            return done(err);
        }
        if (!row) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt_1.default.compare(password, row.password, (error, result) => {
            if (error) {
                return done(error);
            }
            if (result) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));
/*
passport.serializeUser(function (user: UserRow, done) {
    console.log("serialize")
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
}); */
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
