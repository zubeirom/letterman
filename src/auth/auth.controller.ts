import {Body, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {SentryInterceptor} from "../interceptors/sentry.interceptor";

@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
}