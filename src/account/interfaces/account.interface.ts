import { Document } from 'mongoose';

export interface Account extends Document {
    email: string,
    fullName: string,
    imageUrl: string
    readonly createdAt: Date,
    readonly updatedAt: Date
}
