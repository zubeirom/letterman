import * as mongoose from 'mongoose';

export const LetterSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }
});