import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';

const bootstrap = async () => {
    try {
        await initMongoConnection();
        setupServer();
    } catch (err) {
        console.error('Failed to bootstrap the application:', err);
    }

};


bootstrap();
