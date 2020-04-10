import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import {AccountService} from "../account/account.service";

require('dotenv').config();

@Injectable()
export class AuthService {

    constructor(private readonly accountService: AccountService) {}
    
     oauth2Client = new google.auth.OAuth2(
         process.env.G_CLIENT_ID,
         process.env.G_CLIENT_SECRET,
         `${process.env.CLIENT}/torii/redirect.html`
     );
     
     oauth2 = google.oauth2({
         auth: this.oauth2Client,
         version: 'v2'
     })
     
     scopes = [
         "https://www.googleapis.com/auth/userinfo.profile"
     ];
}
