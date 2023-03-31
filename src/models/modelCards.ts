import { Document, model, Schema } from "mongoose";

interface IDBC extends Document {
  residencia: string;
  uids: string[];
}

const DBC_Schema = new Schema({
  residencia: String,
  uids: [String],
});

const DBCM = model<IDBC>('numeralcards', DBC_Schema);

export { IDBC };
export default DBCM;
