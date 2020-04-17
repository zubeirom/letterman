import { Injectable } from '@nestjs/common';
import {Storage} from "@google-cloud/storage";

@Injectable()
export class AppService {

    storage = new Storage({
        projectId: process.env.G_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CRED
    });

    bucket = this.storage.bucket(process.env.G_BUCKET_NAME);
    
    async streamImage(fileName) {
        try {
            return await this.bucket.file(fileName).download();
        } catch (e) {
            throw e;
        }
    }
}
