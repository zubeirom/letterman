import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LetterModule} from './letter/letter.module';
import {LetterController} from './letter/letter.controller';
import {LetterService} from './letter/letter.service';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [LetterModule, MongooseModule.forRoot('mongodb://localhost/lettermanDB')],
    controllers: [AppController, LetterController],
    providers: [AppService, LetterService],
})
export class AppModule {
}
