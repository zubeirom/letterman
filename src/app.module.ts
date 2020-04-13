import {MiddlewareConsumer, Module, NestModule,} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LetterModule} from './letter/letter.module';
import {AccountModule} from './account/account.module';
import {AuthModule} from './auth/auth.module';
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {LetterController} from "./letter/letter.controller";
import {LabelModule} from "./label/label.module";

require('dotenv').config();

@Module({
    imports: [LetterModule, MongooseModule.forRoot(process.env.PROD_DB), AccountModule, AuthModule, LabelModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(LetterController, LabelModule)
    }
}
