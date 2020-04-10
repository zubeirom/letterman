import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {AccountModule} from "../account/account.module";
// eslint-disable-next-line import/extensions

@Module({
    imports: [
        AccountModule,
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
