import * as mongoose from 'mongoose';

export const LetterSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    title: String,
    content: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    label: [String],
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});
