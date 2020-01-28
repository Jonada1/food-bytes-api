import { Document } from "mongoose";

export interface Image extends Document {
    id: string,
    text: string,
    url: string,
}