import passport from 'passport';

export function login(req, res, next) {
    passport.authenticate('basic',{ session: true }, function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ message: info?.message || 'Incorrect username or password.' }); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            
            return res.status(200).json({ message: 'Erfolgreich angemeldet..', user: req.user });
        });

        
    })(req, res, next);

}