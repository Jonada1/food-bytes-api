import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
    id: String,
    text: String,
    url: String,
});
