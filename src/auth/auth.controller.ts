import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from "../app.service";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google-url')
    async getGoogleUrl() {
        return this.authService.getGoogleAuthUrl();
    }

    @Post('google-auth')
    async googleAuth(@Body() body) {
        return this.authService.googleAuth(body.authorizationCode);
    }
}