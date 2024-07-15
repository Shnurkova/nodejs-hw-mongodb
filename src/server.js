import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

function setupServer() {
    const app = express();

    app.use(pino());
    app.use(cors());

    app.get("/", (req, res) => {
        res.send([
            {
                id: 1,
                title: 'Title 1',
            },
            {
                id: 2,
                title: 'Title 2',
            },
            {
                id: 3,
                title: 'Title 3',
            },
        ]);
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

export default setupServer;
