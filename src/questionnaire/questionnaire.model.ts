import { Document } from "mongoose";

export interface Questionnaire extends Document {
    questionOneAnswer: number;
    questionTwoAnswer: number;
    questionThreeAnswer: number;
    questionFourAnswer: number;
    questionFiveAnswer: number;
    userId: string;
    imageId: string;
}