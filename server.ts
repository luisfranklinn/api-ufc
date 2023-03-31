import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import mongoose, { MongooseOptions } from 'mongoose';

import DBM from './src/models/model';
import DBCM from './src/models/modelCards';

const app = express();
app.use(bodyParser.json());

const db_string = "mongodb+srv://marcosgabriel:mgmm4103@cluster0.7mnfxzs.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(db_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as MongooseOptions);
        console.log('Connected to database');
    } catch (err) {
        console.error('Failed to connect to database', err);
    }
};

connectDb();

function FormatedData(unix: number): string {
    return new Date(unix * 1000).toLocaleString("pt-BR");
};

app.post('/', async (req: Request, res: Response) => {
    //! ATENÇÃO VARIAS REQUISIÇÕES AO BANCO DE DADOS, ISSO PODE DEIXAR A API LENTA. (VAI QUEBRAR).
    //* A TESTAR.

    let uid, data, permissao, sentido;
    for (let i = 0; i < req.body.length; i++) {
        uid = req.body[i].uid;
        for (let j = 0; j < req.body[i].data.length; j++) {
            data = req.body[i].data[j];
            sentido = req.body[i].sentido[j];
            permissao = req.body[i].permissao[j];

            try {
                DBM.findOneAndUpdate(
                    { UID: uid },
                    {
                        $push: {
                            HistoricoData: FormatedData(data),
                            HistoricoSentido: sentido,
                            HistoricoPermissao: permissao
                        }
                    },
                    async (err: any, documento: any) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (i == req.body.length - 1) {
                                console.log("Todos os documentos atualizados");
                            }; //caso queria ver o documento, so atualizar por "documento"
                        }
                    }
                );
            } catch (err) {
                console.log(err);
                return res.status(-1).send("Erro interno do servidor");
            };
        }
    }
});

interface Historico {
    uid_: string;
    data_: string[];
    sentido_: string[];
    permissao_: string[];
}

app.get('/get', async (req: Request, res: Response) => {

    const data = await DBCM.findOne({ residencia: "residencia2216" });
    if (data !== null) {
        const luid = data.uids;

        let historico: Historico[] = [];
        for (let i = 0; i < luid.length; i++) {
            const uid_ = luid[i];
            const data_: string[] = [];
            const sentido_: string[] = [];
            const permissao_: string[] = [];

            historico.push({ uid_, data_, sentido_, permissao_ });
        }

        const historicoJson = JSON.stringify(historico);
        console.log(historicoJson);
        res.send(historicoJson);
    }
});

app.listen(
    process.env.PORT ? Number(process.env.PORT) : 3000,
    '0.0.0.0',
    () => {
        console.log('HTTP Server Running');
    }
).on('error', (err) => {
    console.error(`Error starting server: ${err.message}`);
});