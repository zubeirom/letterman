import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async create(accountDto) {
        try {
            const newAccount = new this.accountModel({...accountDto, createdAt: new Date(), updatedAt: new Date()})
            return await newAccount.save();
        } catch (e) {
            throw e;
        }
    }

    async get() {
        try {
            return this.accountModel.find().exec();
        } catch (e) {
            throw e;
        }
    }

    async getOne(accountId: string) {
        try {
            return await this.findAccount(accountId);
        } catch (e) {
            throw e;
        }
    }

    async findAccount(accountId: string) {
        try {
            const account = await this.accountModel.findOne(accountId);
            if(!account) {
                throw new NotFoundException('Account Not Found')
            }
            return account;
        } catch (e) {
            throw e;
        }
    }
}
