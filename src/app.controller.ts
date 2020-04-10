import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

require('dotenv').config();

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('.well-known/microsoft-identity-association.json')
    publisherDomain() {
        console.log("dsmocmspdcom");
        return {
            "associatedApplications": [
                {
                    "applicationId": process.env.AZURE_APPLICATION_ID
                }
            ]
        }
    }
}
