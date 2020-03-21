import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LetterModule } from './letter/letter.module';

require('dotenv').config();

@Module({
    imports: [LetterModule, MongooseModule.forRoot(process.env.LOCAL_DB)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
