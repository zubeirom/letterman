import {
    Controller,
    Body,
    Post,
    Get,
    Param,
    Delete,
    Headers,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import {LetterService} from "./letter.service";
import {SentryInterceptor} from "../interceptors/sentry.interceptor";
import {validateAndGetUid} from "../utils/index.utils";

@UseInterceptors(SentryInterceptor)
@Controller('letters')
export class LetterController {
    constructor(private readonly letterService: LetterService) {
    }

    @Post()
    async create(@Body() createLetterDto, @Headers("authorization") authHeader) {
        try {
            const uid = await validateAndGetUid(authHeader);
            return {letter: await this.letterService.create({...createLetterDto.letter, uid})}
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    @Get()
    async get(@Headers("authorization") authHeader, @Query('search') searchValue) {
        try {
            const uid = await validateAndGetUid(authHeader);
            return {letters: await this.letterService.get(uid, searchValue)};
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    @Get(':id')
    async getOne(@Param("id") letterId: string) {
        return {letter: await this.letterService.getOne(letterId)}
    }

    @Delete(':id')
    async delete(@Param("id") letterId: string) {
        await this.letterService.delete(letterId);
        return {}
    }

    @Put(':id')
    async update(@Param("id") letterId: string, @Body() body) {
        return {packet: await this.letterService.update(letterId, body)}
    }
}
