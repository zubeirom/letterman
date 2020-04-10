import {Controller, Get, Res} from '@nestjs/common';
import { Response } from 'express';
import {AppService} from './app.service';

require('dotenv').config();

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('.well-known/microsoft-identity-association.json')
    publisherDomain(@Res() res: Response) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            associatedApplications: [
                {
                    applicationId: process.env.AZURE_APPLICATION_ID
                }
            ]
        }));
    }
}
