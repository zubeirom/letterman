import {Controller, Body, Post, Get, Param, Delete, Headers, UnauthorizedException} from '@nestjs/common';
import {LetterService} from "./letter.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

// TODO: Create PUT letters/:id

@Controller('letters')
export class LetterController {
    constructor(private readonly letterService: LetterService) {}

    @Post()
    async create(@Body() createLetterDto) {
        return { letter: await this.letterService.create(createLetterDto)}
    }
    
    @Get()
    async get(@Headers("authorization") authHeader) {
        return {letters: await this.letterService.get(authHeader.split(' ')[1])};
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
}
