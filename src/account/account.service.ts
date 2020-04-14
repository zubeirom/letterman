import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {Letter} from 'src/letter/interfaces/letter.interface';
import {Storage} from "@google-cloud/storage";
import {LetterService} from "../letter/letter.service";
import {LabelService} from "../label/label.service";

require('dotenv').config();

@Injectable()
export class AccountService {
    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>, private readonly letterService: LetterService, private readonly labelService: LabelService) {
    }

    storage = new Storage({
        projectId: process.env.G_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CRED
    });

    bucket = this.storage.bucket(process.env.G_BUCKET_NAME);

    async deleteAccount(uid: string) {
        try {
            const letters = await this.letterService.get(uid, "");
            await this.labelService.deleteAll(uid);
            // eslint-disable-next-line no-restricted-syntax
            for (const letter of letters) {
                try {
                    // eslint-disable-next-line no-underscore-dangle
                    this.letterService.delete(letter._id)
                } catch (e) {
                    throw e;
                }
            }
        } catch (e) {
            throw e;
        }
    }
}
