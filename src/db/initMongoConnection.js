import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

async function initMongoConnection() {
    try {

        const DB_URI = process.env.DB_URI;

        // const user = env('MONGODB_USER');
        // const password = env('MONGODB_PASSWORD');
        // const url = env('MONGODB_URL');
        // const db = env('MONGODB_DB');

        await mongoose.connect(DB_URI);

        console.log('Mongo connection successfully established!');

    } catch (error) {
        console.error(error);
    }
}

export { initMongoConnection };
