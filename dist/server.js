"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_body_parser = __toESM(require("body-parser"));
var import_express = __toESM(require("express"));
var import_mongoose3 = __toESM(require("mongoose"));

// src/models/model.ts
var import_mongoose = require("mongoose");
var DB_Schema = new import_mongoose.Schema({
  UID: String,
  Nome: String,
  DataNascimento: String,
  Sexo: String,
  Email: String,
  Telefone: String,
  ContatoEmerg\u00EAnciaNome: String,
  ContatoEmerg\u00EAnciaParentesco: String,
  ContatoEmerg\u00EAnciaTelefone: String,
  Rua: String,
  Numero: String,
  Bairro: String,
  CEP: String,
  HistoricoData: [String],
  HistoricoPermissao: [String],
  HistoricoSentido: [String]
});
var DBM = (0, import_mongoose.model)("residentes", DB_Schema);
var model_default = DBM;

// src/models/modelCards.ts
var import_mongoose2 = require("mongoose");
var DBC_Schema = new import_mongoose2.Schema({
  residencia: String,
  uids: [String]
});
var DBCM = (0, import_mongoose2.model)("numeralcards", DBC_Schema);
var modelCards_default = DBCM;

// server.ts
var app = (0, import_express.default)();
app.use(import_body_parser.default.json());
var db_string = "mongodb+srv://marcosgabriel:mgmm4103@cluster0.7mnfxzs.mongodb.net/?retryWrites=true&w=majority";
var connectDb = async () => {
  try {
    await import_mongoose3.default.connect(db_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Failed to connect to database", err);
  }
};
connectDb();
function FormatedData(unix) {
  return new Date(unix * 1e3).toLocaleString("pt-BR");
}
app.post("/", async (req, res) => {
  let uid, data, permissao, sentido;
  for (let i = 0; i < req.body.length; i++) {
    uid = req.body[i].uid;
    for (let j = 0; j < req.body[i].data.length; j++) {
      data = req.body[i].data[j];
      sentido = req.body[i].sentido[j];
      permissao = req.body[i].permissao[j];
      try {
        model_default.findOneAndUpdate(
          { UID: uid },
          {
            $push: {
              HistoricoData: FormatedData(data),
              HistoricoSentido: sentido,
              HistoricoPermissao: permissao
            }
          },
          async (err, documento) => {
            if (err) {
              console.log(err);
            } else {
              if (i == req.body.length - 1) {
                console.log("Todos os documentos atualizados");
              }
              ;
            }
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(-1).send("Erro interno do servidor");
      }
      ;
    }
  }
});
app.get("/get", async (req, res) => {
  const data = await modelCards_default.findOne({ residencia: "residencia2216" });
  if (data !== null) {
    const luid = data.uids;
    let historico = [];
    for (let i = 0; i < luid.length; i++) {
      const uid_ = luid[i];
      const data_ = [];
      const sentido_ = [];
      const permissao_ = [];
      historico.push({ uid_, data_, sentido_, permissao_ });
    }
    const historicoJson = JSON.stringify(historico);
    console.log(historicoJson);
    res.send(historicoJson);
  }
});
app.listen(
  process.env.PORT ? Number(process.env.PORT) : 3e3,
  "0.0.0.0",
  () => {
    console.log("HTTP Server Running");
  }
).on("error", (err) => {
  console.error(`Error starting server: ${err.message}`);
});
//! ATENÇÃO VARIAS REQUISIÇÕES AO BANCO DE DADOS, ISSO PODE DEIXAR A API LENTA. (VAI QUEBRAR).
