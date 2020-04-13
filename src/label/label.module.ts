import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {LabelController} from "./label.controller";
import {LabelService} from "./label.service";
import { LabelSchema } from './schemas/label.schema';
import {LetterSchema} from "../letter/schemas/letter.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Label', schema: LabelSchema }, {name: 'Letter', schema: LetterSchema}])],
    controllers: [LabelController],
    providers: [LabelService],
})
export class LabelModule {
}
