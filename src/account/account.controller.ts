import {Controller, Get, Param} from '@nestjs/common';
import {AccountService} from "./account.service";

@Controller('api/accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get(':id')
    async get(@Param("id") accountId: string) {
        return {account: await this.accountService.getOne(accountId)}
    }
}
