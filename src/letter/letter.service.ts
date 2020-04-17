import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Storage} from "@google-cloud/storage";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {Letter} from './interfaces/letter.interface';
import {imageToText} from "../common/common.service";

@Injectable()
export class LetterService {
    constructor(@InjectModel('Letter') private readonly letterModel: Model<Letter>) {
    }

    storage = new Storage({
        projectId: process.env.G_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CRED
    });

    bucket = this.storage.bucket(process.env.G_BUCKET_NAME);

    async create(letterDto) {
        try {
            const processed = await imageToText(letterDto.imageUrl);
            const content = await jwt.sign(processed, process.env.PRIVATE_KEY);
            const newLetter = new this.letterModel({
                ...letterDto,
                content,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return newLetter.save();
        } catch (e) {
            throw e;
        }
    }

    async get(uid: string, searchValue: string) {
        try {
            if (searchValue) {
                return this.letterModel.find({
                    uid,
                    title: {"$regex": searchValue, "$options": "i"},
                }).sort('-updatedAt').exec();
            }
            return this.letterModel.find({uid}).sort('-updatedAt').exec();

        } catch (e) {
            throw e
        }
    }

    async getOne(letterId: string) {
        try {
            const letter = await this.findLetter(letterId);
            letter.content = await jwt.verify(letter.content, process.env.PRIVATE_KEY);
            return letter;
        } catch (e) {
            throw e;
        }
    }

    async delete(letterId: string) {
        try {
            const letter = await this.findLetter(letterId);
            if(letter) {
                await this.bucket.file(letter.imageUrl).delete();
                await letter.remove();
            }
        } catch (e) {
            throw e;
        }

    }

    async update(letterId, body) {
        try {
            const {title, content, label} = body.letter;
            const tokenized = await jwt.sign(content, process.env.PRIVATE_KEY);
            const letter = await this.findLetter(letterId);
            letter.title = title;
            letter.content = tokenized;
            letter.label = label;
            letter.updatedAt = new Date();
            return letter.save();
        } catch (e) {
            throw e;
        }
    }

    async findLetter(letterId: string) {
        try {
            const letter = this.letterModel.findById(letterId);
            if (!letter) {
                throw new NotFoundException('Letter Not Found')
            }
            return letter;
        } catch (e) {
            throw e;
        }
    }
}
