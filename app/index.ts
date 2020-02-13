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

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/create-user', jsonParser, async function (req: any, res: any) {
    const user: User = req.body;

    await mongoClient.insertObject('users', user);

    res.sendStatus(201);
});

app.post('/addAvatar/:userNick', upload.single('avatar'), async function (req: any, res: any) {
    const base64Avatar = req.file.buffer.toString('base64');

    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (user) user.avatar = base64Avatar;

    if (user) await mongoClient.updateObject<User>('users', { nick: req.params.userNick }, user);

    res.sendStatus(200);
});

app.get('/getAvatar/:userNick', async function (req: any, res: any) {

    const user: User | null = await mongoClient.findObject<User>('users', { nick: req.params.userNick });
    if (!user) throw new Error('User was not found');

    const binaryData = Buffer.from(user.avatar, 'base64');

    res.set('Content-Type', 'image/jpeg');
    res.status(200);
    res.send(binaryData);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});