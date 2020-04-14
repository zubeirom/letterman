import {Controller, Get, Post, Res, UploadedFile, Next, UseInterceptors} from '@nestjs/common';
import {NextFunction, Response} from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import {AppService} from './app.service';
import {SentryInterceptor} from "./interceptors/sentry.interceptor";

require('dotenv').config();

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    storage = new Storage({
        projectId: process.env.G_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CRED
    });

    bucket = this.storage.bucket(process.env.G_BUCKET_NAME);

    @Get('.well-known/microsoft-identity-association.json')
    publisherDomain(@Res() res: Response) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            "associatedApplications": [
                {
                    "applicationId": process.env.AZURE_APPLICATION_ID
                }
            ]
        }));
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async uploadFile(@UploadedFile() file, @Next() next, @Res() res: Response) {
        const blob = this.bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });
        blobStream.on("error", err => {
            next(err);
        });
        blobStream.on("finish", () => {
            res.status(200).send('Ok');
        });

        blobStream.end(file.buffer);
    }
}
