import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

async function bootstrap() {
    try {
        await initMongoConnection();
    } catch (error) {
        console.error(error);
    }
}

setupServer();
bootstrap();
