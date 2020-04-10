import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        if(req.headers.authorization) {
            next();
        } else {
            throw new UnauthorizedException('Unauthorized Request')
        }
    }
}
