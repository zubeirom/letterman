import {Controller, Body, Post, Get, Param, Delete, Headers, Head, UseInterceptors} from '@nestjs/common';
import {LabelService} from './label.service';
import {SentryInterceptor} from "../interceptors/sentry.interceptor";
import {validateAndGetUid} from "../utils/index.utils";

@UseInterceptors(SentryInterceptor)
@Controller('labels')
export class LabelController {
    constructor(private readonly labelService: LabelService) {
    }

    @Get()
    async get(@Headers('authorization') authHeader) {
        try {
            const uid = await validateAndGetUid(authHeader);
            return {labels: await this.labelService.get(uid)}
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    @Get(":id")
    async getOne(@Param("id") labelId: string, @Headers('authorization') authHeader) {
        try {
            const uid = await validateAndGetUid(authHeader);
            return {label: await this.labelService.getAllLettersByLabelId(labelId, uid)};
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    @Post()
    async create(@Body() createLabelDto, @Headers("authorization") authHeader) {
        try {
            const uid = await validateAndGetUid(authHeader);
            return {label: await this.labelService.create({...createLabelDto.label, uid})}
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    @Delete(":id")
    async delete(@Param("id") labelId: string) {
        await this.labelService.delete(labelId);
        return {}
    }
}
