import { Document } from 'mongoose';

export interface Account extends Document {
    providerId: string,
    email: string,
    fullName: string,
    imageUrl: string
    readonly createdAt: Date,
    readonly updatedAt: Date
}
