import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes';

const config = {
    port: process.env.PORT || 3000,
}

app.get('/', (req, res) => {
    res.send('API de Acessos das Residências da Universidade Federal do Ceará');
})

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

app.listen(config.port, () => {
    console.log(`Api das Residências ${config.port}`);
});
