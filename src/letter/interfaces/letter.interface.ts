import { Document } from 'mongoose';

export interface Letter extends Document {
    uid: string,
    title: string,
    content: string,
    imageUrl: string,
    label: string[],
    readonly createdAt: Date,
    readonly updatedAt: Date
}
