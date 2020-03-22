import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LetterModule } from './letter/letter.module';
import { AccountModule } from './account/account.module';

require('dotenv').config();

@Module({
    imports: [LetterModule, MongooseModule.forRoot(process.env.LOCAL_DB), AccountModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
