import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LetterSchema } from './schemas/letter.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Letter', schema: LetterSchema }])],
})
export class LetterModule {
}
