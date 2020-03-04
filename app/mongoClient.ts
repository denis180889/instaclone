
import Client from 'mongodb';

export default class MongoClient {

    url: string;

    constructor(dbUrl: string) {
        this.url = dbUrl;
    }

    async getConnection() {
        return await Client.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async insertObject(collection: string, obj: object) {
        const client = await this.getConnection();
        try {
            const db = client.db();
            await db.collection(collection).insertOne(obj);
        }
        catch (e) {
            throw e;
        }
        finally {
            await client.close();
        }
    }

    async findObject<T>(collection: string, filter: any): Promise<T | null> {
        const client = await this.getConnection();
        try {
            const db = client.db();
            const result = await db.collection<T>(collection).findOne(filter);
            return result;
        }
        catch (e) {
            throw e;
        }
        finally {
            await client.close();
        }
    }

    async updateObject<T>(collection: string, filter: any, obj: T) {
        const client = await this.getConnection();
        try {
            const db = client.db();
            await db.collection<T>(collection).updateOne(filter, { $set: obj });
        }
        catch (e) {
            throw e;
        }
        finally {
            await client.close();
        }
    }
}