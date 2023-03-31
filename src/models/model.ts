import { Model, model, Schema } from "mongoose";

interface Residente {
    UID: string;
    Nome: string;
    DataNascimento: string;
    Sexo: string;
    Email: string;
    Telefone: string;
    ContatoEmergênciaNome: string;
    ContatoEmergênciaParentesco: string;
    ContatoEmergênciaTelefone: string;
    Rua: string;
    Numero: string;
    Bairro: string;
    CEP: string;
    HistoricoData: string[];
    HistoricoPermissao: string[];
    HistoricoSentido: string[];
}

const DB_Schema = new Schema<Residente>({
    UID: String,
    Nome: String,
    DataNascimento: String,
    Sexo: String,
    Email: String,
    Telefone: String,
    ContatoEmergênciaNome: String,
    ContatoEmergênciaParentesco: String,
    ContatoEmergênciaTelefone: String,
    Rua: String,
    Numero: String,
    Bairro: String,
    CEP: String,
    HistoricoData: [String],
    HistoricoPermissao: [String],
    HistoricoSentido: [String]
});

const DBM: Model<Residente> = model<Residente>('residentes', DB_Schema);
export default DBM;
