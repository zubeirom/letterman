import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
    
    getUID(authHeader: string) {
        return authHeader.split(' ')[1];
    }
}
