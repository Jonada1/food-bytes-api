import { Document } from "mongoose";

export interface Image extends Document {
    text: string,
    url: string,
    userId: string,
}