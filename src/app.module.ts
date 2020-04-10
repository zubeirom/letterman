import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LetterModule} from './letter/letter.module';
import {AccountModule} from './account/account.module';
import {AuthModule} from './auth/auth.module';
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {LetterController} from "./letter/letter.controller";

require('dotenv').config();

@Module({
    imports: [LetterModule, MongooseModule.forRoot(process.env.LOCAL_DB), AccountModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: '.well-known', method: RequestMethod.GET },
            )
            .forRoutes(LetterController)
    }
}
