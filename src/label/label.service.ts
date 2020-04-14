import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Letter} from 'src/letter/interfaces/letter.interface';
import {Label} from './interfaces/label.interface';

@Injectable()
export class LabelService {
    constructor(@InjectModel('Label') private readonly labelModel: Model<Label>, @InjectModel('Letter') private readonly letterModel: Model<Letter>) {}

    async get(uid: string) {
        try {
            return this.labelModel.find({uid}).exec();
        } catch (e) {
            throw e;
        }
    }

    async getAllLettersByLabelId(labelId: string, uid: string) {
        try {
            const label = await this.labelModel.findById(labelId).exec();
            const letters = await this.letterModel.find({label: label.name, uid}).exec();
            // eslint-disable-next-line no-underscore-dangle
            return {_id: label._id, name: label.name, letters}
        } catch (e) {
            throw e;
        }
    }

    async create(labelDto) {
        try {
            const newLabel = new this.labelModel({...labelDto, createdAt: new Date(), updatedAt: new Date()});
            return newLabel.save();
        } catch (e) {
            throw e;
        }
    }

    async delete(labelId: string) {
        try {
            this.labelModel.deleteOne({_id: labelId}).exec();
        } catch (e) {
            throw e;
        }
    }

    async deleteAll(uid: string) {
        try {
            await this.labelModel.deleteMany({uid});
        } catch (e) {
            throw e;
        }
    }
}
