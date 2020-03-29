import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    providerId: String,
    email: {
        type: String,
        required: true
    },
    fullName: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});
