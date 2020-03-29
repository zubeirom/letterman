import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import {AccountService} from "../account/account.service";

require('dotenv').config();

@Injectable()
export class AuthService {

    constructor(private readonly accountService: AccountService) {
    }
    
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
    

     async getGoogleAuthUrl() {
         try {
             const url = this.oauth2Client.generateAuthUrl({
                 // eslint-disable-next-line @typescript-eslint/camelcase
                 access_type: 'online',
                 scope: this.scopes
             });
             return url;
         } catch(e){
             throw e;
         }
     }

     async googleAuth(authorizationCode) {
         try {
             const { tokens } = await this.oauth2Client.getToken(authorizationCode);
             this.oauth2Client.setCredentials(tokens);

             const { data } = await this.oauth2.userinfo.get();
             
             const account = await this.accountService.findAccountByEmail(data.email);
             
             if(!account) {
                 await this.accountService.create({email: data.email, imageUrl: data.picture, providerId: data.id})
             }
             
             // eslint-disable-next-line @typescript-eslint/camelcase
             return {access_token: tokens.access_token};
             
         } catch (e) {
             throw e;
         }
     }
    
     async createJwt(email) {
         try {
             
         } catch (e) {
             throw e;
         }
     }
}
