import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({

  UID: String,
  student_name: String,
  date_time: String,
  acess_type: String,
});


export default model('House_Acess', HouseSchema);