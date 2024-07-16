import mongoose from "mongoose";

async function initMongoConnection() {
    try {

        const DB_URI = "mongodb+srv://annshnur:jsvV5h8uH2KHM76b@cluster0.7yruouk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
