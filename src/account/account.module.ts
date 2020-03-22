import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AccountSchema} from "./schemas/account.schemas";
import {AccountController} from "./account.controller";
import {AccountService} from "./account.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Account', schema: AccountSchema}])],
    controllers: [AccountController],
    providers: [AccountService]
})

export class AccountModule {
}
