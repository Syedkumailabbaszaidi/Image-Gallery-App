import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  config.update({
    accessKeyId: configService.get('aws.access_key_id'),
    secretAccessKey: configService.get('aws.secret_access_key'),
    region: configService.get('aws.region'),
  });

  await app.listen(PORT);
}
bootstrap();
