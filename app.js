import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes';


class App {
    constructor() {
        this.server = express();

        mongoose.connect('mongodb+srv://luisfranklinn:jala2900@devhouse.qetbh9s.mongodb.net/devhouse?retryWrites=true&w=majority')

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }
    routes() {
        this.server.use(routes);
    }
}

export default new App().server;