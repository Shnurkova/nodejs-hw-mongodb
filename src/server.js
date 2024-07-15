import express from 'express';
import pino from 'pino';
import cors from 'cors';

function setupServer() {
    const app = express();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

export default setupServer;
