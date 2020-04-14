import {Controller, Get, Headers, Param, UseInterceptors} from '@nestjs/common';
import {AccountService} from "./account.service";
import {getUID} from "../utils/index.utils";
import {SentryInterceptor} from "../interceptors/sentry.interceptor";

@UseInterceptors(SentryInterceptor)
@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get('delete')
    async get(@Headers('authorization') authHeader) {
        return this.accountService.deleteAccount(getUID(authHeader));
    }
}
