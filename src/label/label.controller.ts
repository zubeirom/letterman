import {Controller, Body, Post, Get, Param, Delete, Headers, Head, UseInterceptors} from '@nestjs/common';
import { LabelService } from './label.service';
import {getUID} from "../utils/index.utils";
import {SentryInterceptor} from "../interceptors/sentry.interceptor";

@UseInterceptors(SentryInterceptor)
@Controller('labels')
export class LabelController {
    constructor(private readonly labelService: LabelService) {}

    @Get()
    async get(@Headers('authorization') authHeader){
        return {labels: await this.labelService.get(authHeader.split(' ')[1])}
    }

    @Get(":id")
    async getOne(@Param("id") labelId: string, @Headers('authorization') authHeader) {
        return { label: await this.labelService.getAllLettersByLabelId(labelId, getUID(authHeader))};
    }

    @Post()
    async create(@Body() createLabelDto, @Headers("authorization") authHeader) {
        return { label: await this.labelService.create({...createLabelDto.label, uid: getUID(authHeader)})}
    }

    @Delete(":id")
    async delete(@Param("id") labelId: string) {
        await this.labelService.delete(labelId);
        return {}
    }
}
