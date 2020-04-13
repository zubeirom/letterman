import {Controller, Body, Post, Get, Param, Delete, Headers, Put, Query} from '@nestjs/common';
import {LetterService} from "./letter.service";
import {getUID} from "../utils/index.utils";

@Controller('letters')
export class LetterController {
    constructor(private readonly letterService: LetterService) {}

    @Post()
    async create(@Body() createLetterDto, @Headers("authorization") authHeader) {
        return { letter: await this.letterService.create({...createLetterDto.letter, uid: getUID(authHeader)})}
    }
    
    @Get()
    async get(@Headers("authorization") authHeader, @Query('search') searchValue) {
        return {letters: await this.letterService.get(getUID(authHeader), searchValue)};
    }

    @Get(':id')
    async getOne(@Param("id") letterId: string) {
        return { letter: await this.letterService.getOne(letterId)}
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
