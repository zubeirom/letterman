import { Document } from 'mongoose';

export interface Letter extends Document {
    account,
    title: string,
    content: string,
    imageUrl: string,
    label: string[],
    readonly createdAt: Date,
    readonly updatedAt: Date
}
