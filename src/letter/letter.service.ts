import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Letter } from './interfaces/letter.interface';
import {imageToText} from "../common/common.service";

// TODO: Create update letter

@Injectable()
export class LetterService {
    constructor(@InjectModel('Letter') private readonly letterModel: Model<Letter>) {}

    async create(letterDto) {
        try {
            const content = await imageToText(letterDto.imageUrl);
            const newLetter = new this.letterModel({ ...letterDto, content, createdAt: new Date(), updatedAt: new Date() });
            return newLetter.save();
        } catch (e) {
            throw e;
        }
    }

    async get(uid: string) {
        try {
            return this.letterModel.find({uid}).sort('-updatedAt').exec();
        }catch (e) {
            throw e
        }
    }

    async getOne(letterId: string) {
        try {
            return await this.findLetter(letterId);
        } catch (e) {
            throw e;
        }
    }

    async delete(letterId: string) {
        try {
            if(await this.findLetter(letterId)) {
                this.letterModel.deleteOne({letterId}).exec()
            }
        } catch (e) {
            throw e;
        }

    }

    async findLetter(letterId: string) {
        try {
            const letter = this.letterModel.findById(letterId);
            if(!letter) {
                throw new NotFoundException('Letter Not Found')
            }
            return letter;
        } catch(e) {
            throw e;
        }
    }
}
