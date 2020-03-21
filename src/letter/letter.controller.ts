import {Controller, Body, Post, Get, Param, Delete} from '@nestjs/common';
import {LetterService} from "./letter.service";

// TODO: Create POST /letters
// TODO: Create GET /letters
// TODO: Create GET /letter/:id
// TODO: Create PUT letters/:id
// TODO: Create DELETE letter/:id

@Controller('letters')
export class LetterController {
    constructor(private readonly letterService: LetterService) {}

    @Post()
    async create(@Body() createLetterDto) {
        return { letter: await this.letterService.create(createLetterDto)}
    }

    @Get()
    async get() {
        return {letters: await this.letterService.get()};
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
