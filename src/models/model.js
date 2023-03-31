import { model, Schema } from "mongoose";


const DB_Schema = new Schema ({
   UID:String,
   Nome:String,
   DataNascimento:String,
   Sexo:String,
   Email:String,
   Telefone:String,
   ContatoEmergênciaNome:String,
   ContatoEmergênciaParentesco:String,
   ContatoEmergênciaTelefone:String,
   Rua:String,
   Numero:String,
   Bairro:String,
   CEP:String,
   HistoricoData:[String],
   HistoricoPermissao:[String],
   HistoricoSentido:[String]
});


const DBM = model('residentes', DB_Schema);
export default DBM;