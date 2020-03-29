import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {AccountService} from "../account/account.service";
import {AccountModule} from "../account/account.module";

@Module({
    imports: [AccountModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
