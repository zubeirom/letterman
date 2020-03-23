import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LetterModule } from './letter/letter.module';
import { AccountModule } from './account/account.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

require('dotenv').config();

@Module({
    imports: [LetterModule, MongooseModule.forRoot(process.env.LOCAL_DB), AccountModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
