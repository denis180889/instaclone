import express from 'express';
import passport from 'passport'
import bodyParser from 'body-parser';
import MongoClient from './mongoClient';
import multer from 'multer';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import './passport'

const app = express();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const jsonParser = bodyParser.json()
const passportJwt = passport.authenticate('jwt', { session: false });

const mongoClient = new MongoClient('mongodb://localhost:27017/user_database');

export interface User {
    _id?: ObjectId;
    nick: string;
    password: string;
    name: string;
    age: string;
    about: string;
    avatar: string;
}

export interface Photo {
    nick: string;
    photos: { [key: number]: string };
}

app.post('/login', jsonParser, async function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
});

app.get('/', passportJwt, async function (req, res) {
    res.send('Hello World!');
});

app.post('/create-user', jsonParser, async function (req: any, res: any) {
    const user: User = req.body;

    await mongoClient.insertObject('users', user);

    res.sendStatus(201);
});

app.get('/get-user/:userNick', passportJwt, async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    delete user.password;
    delete user.nick;
    delete user.avatar;
    delete user._id;

    res.json(user);
});

app.patch('/edit-user/:userNick', passportJwt, jsonParser, async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    user.name = req.body.name;
    user.age = req.body.age;
    user.about = req.body.about;
    await mongoClient.updateObject<User>('users', { nick: req.params.userNick }, user);

    res.sendStatus(200);
});

app.post('/add-avatar/:userNick', upload.single('avatar'), async function (req: any, res: any) {
    const base64Avatar = req.file.buffer.toString('base64');

    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    user.avatar = base64Avatar;
    await mongoClient.updateObject<User>('users', { nick: req.params.userNick }, user);

    res.sendStatus(200);
});

app.get('/get-avatar/:userNick', async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    const binaryData = Buffer.from(user.avatar, 'base64');

    res.set('Content-Type', 'image/jpeg');

    if (binaryData) {
        res.status(200);
        res.send(binaryData)
    }
    else {
        res.sendStatus(404)
    }
    ;
});

app.post('/add-photos/:userNick', passportJwt, upload.array('photos', 5), async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    let base64Photos: { [key: number]: string } = {};
    let key = Date.now();
    for (const originPhoto of req.files) {
        const base64Photo = originPhoto.buffer.toString('base64');
        key += 1;
        base64Photos[key] = base64Photo;
    }

    const photo: Photo = { nick: req.params.userNick, photos: base64Photos }

    const existingPhotos: Photo | null = await mongoClient.findObject<Photo>('photos', { nick: req.params.userNick });
    if (!existingPhotos) {
        await mongoClient.insertObject('photos', photo);
    }
    else {
        for (let [key, value] of Object.entries(base64Photos)) {
            await mongoClient.updateExistingObject('photos', { nick: req.params.userNick }, { [`photos.${key}`]: value });
        }
    }
    res.sendStatus(200);
});

app.get('/get-photos/:userNick', passportJwt, async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    const photoObj: Photo | null = await mongoClient.findObject<Photo>('photos', { nick: req.params.userNick });
    if (photoObj) {
        const base64Photos: { [key: number]: string } = photoObj.photos;
        let photoKeys = Object.keys(base64Photos);
        return res.json({ photoKeys });
    }
    else {
        res.sendStatus(404);
    }
});

app.get('/get-photo/:userNick/:photoId', async function (req: any, res: any) {
    const photo = await mongoClient.findObject<Photo>('photos', { nick: req.params.userNick });
    if (!photo) throw new Error('Photo was not found');

    const stringData = photo.photos[req.params.photoId];
    if (!stringData) throw new Error('Invalid photo id');

    const binaryData = Buffer.from(stringData, 'base64');

    res.set('Content-Type', 'image/jpeg');
    res.status(200);
    res.send(binaryData);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});