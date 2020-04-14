import {Controller, Get, Headers, Param} from '@nestjs/common';
import {AccountService} from "./account.service";
import {getUID} from "../utils/index.utils";

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get('delete')
    async get(@Headers('authorization') authHeader) {
        return this.accountService.deleteAccount(getUID(authHeader));
    }
}
