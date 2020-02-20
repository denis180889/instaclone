import passport from 'passport';
import { Strategy } from 'passport-local'
import MongoClient from './mongoClient';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const mongoClient = new MongoClient('mongodb://localhost:27017/user_database');

passport.use(new Strategy({
    usernameField: 'nickName',
    passwordField: 'pass',
},
    async function (nickName: string, pass: string, cb: any) {
        try {
            const user = await mongoClient.findObject('users', { nick: nickName, password: pass });
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            return cb(null, user, { message: 'Logged In Successfully' });
        }
        catch (err) {
            return cb(err);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    async function (jwtPayload: any, cb: any) {
        try {
            const user = await mongoClient.findObject('users', { nick: jwtPayload.nick });
            return cb(null, user);
        }
        catch (err) {
            return cb(err);
        }
    }
));