import { Document } from 'mongoose';

export interface Label extends Document {
    uid: string,
    name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
}
