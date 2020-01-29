import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  text: String,
  url: String,
  userId: String,
});
