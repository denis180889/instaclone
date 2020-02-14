import express from 'express';
import bodyParser from 'body-parser';
import MongoClient from './mongoClient';
import multer from 'multer';
import { ObjectId } from 'mongodb';

const app = express();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const jsonParser = bodyParser.json()

const mongoClient = new MongoClient('mongodb://localhost:27017/user_database');

export interface User {
    _id?: ObjectId;
    nick: string;
    name: string;
    age: string;
    about: string;
    avatar: string;
}

export interface Photo {
    nick: string;
    photos: string[];
}

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/create-user', jsonParser, async function (req: any, res: any) {
    const user: User = req.body;

    await mongoClient.insertObject('users', user);

    res.sendStatus(201);
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
    res.status(200);
    res.send(binaryData);
});

app.post('/add-photos/:userNick', upload.array('photos', 5), async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    let base64Photos: string[] = [];
    for (const originPhoto of req.files) {
        const base64Photo = originPhoto.buffer.toString('base64');
        base64Photos.push(base64Photo);
    }

    const photo: Photo = { nick: req.params.userNick, photos: base64Photos }
    await mongoClient.insertObject('photos', photo);

    res.sendStatus(200);
});

app.get('/get-photos/:userNick', async function (req: any, res: any) {
    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    const photoObj: Photo | null = await mongoClient.findObject<Photo>('photos', { nick: req.params.userNick });
    if (!photoObj) throw new Error('Photo was not found for this user');

    const base64Photos: string[] = photoObj.photos;

    let binaryPhotos: Buffer[] = [];
    for (const base64Photo of base64Photos) {
        const binaryPhoto = Buffer.from(base64Photo, 'base64');
        binaryPhotos.push(binaryPhoto);
    }

    res.set('Content-Type', 'image/jpeg');
    res.status(200);
    res.send(binaryPhotos);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});