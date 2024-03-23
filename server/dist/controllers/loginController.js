"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
function login(req, res, next) {
    passport_1.default.authenticate('basic' /* ,{ session: true }, */, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: (info === null || info === void 0 ? void 0 : info.message) || 'Incorrect username or password.' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Erfolgreich angemeldet..', user: req.user });
        });
    })(req, res, next);
}
exports.login = login;
