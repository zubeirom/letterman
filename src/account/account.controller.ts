import {Controller, Get, Headers, Param, UseInterceptors} from '@nestjs/common';
import {AccountService} from "./account.service";
import {SentryInterceptor} from "../interceptors/sentry.interceptor";
import {validateAndGetUid} from "../utils/index.utils";

@UseInterceptors(SentryInterceptor)
@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get('delete')
    async get(@Headers('authorization') authHeader) {
        try {
            const uid = await validateAndGetUid(authHeader);
            return this.accountService.deleteAccount(uid);
        } catch(e){
            throw e;
        }
    }
}
