import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    Sentry.init({
        dsn: 'https://068a3c7229934767a9c338902bbe4b23@o297291.ingest.sentry.io/5199535',
    });
    app.setGlobalPrefix('api');
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
