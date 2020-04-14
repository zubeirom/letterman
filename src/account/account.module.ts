import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AccountSchema} from "./schemas/account.schemas";
import {AccountController} from "./account.controller";
import {AccountService} from "./account.service";
import {LetterSchema} from "../letter/schemas/letter.schema";
import {LetterService} from "../letter/letter.service";
import {LabelService} from "../label/label.service";
import {LabelSchema} from "../label/schemas/label.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Account', schema: AccountSchema}, {name: 'Letter', schema: LetterSchema}, {name: 'Label', schema: LabelSchema}])],
    controllers: [AccountController],
    providers: [AccountService, LetterService, LabelService],
    exports: [AccountService]
})

export class AccountModule {
}
