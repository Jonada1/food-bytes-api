import * as mongoose from 'mongoose';

export const QuestionnaireSchema = new mongoose.Schema({
    questionOneAnswer: Number,
    questionTwoAnswer: Number,
    questionThreeAnswer: Number,
    questionFourAnswer: Number,
    questionFiveAnswer: Number,
    userId: String,
    imageId: String,
});
