import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from "./routers/contacts.js";


function setupServer() {
    const app = express();

    app.use(pino());
    app.use(cors());
    app.use("/contacts", router);



    app.use('*', (req, res, next) => {
    res.status(404).json({
      message: "Not found"
    });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

export default setupServer;
