import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common/enums';
import { Logger } from '@nestjs/common/services';
import { AppModule } from './app.module';
import { getConfig, IS_DEV } from './utils';

export const config = getConfig();
const PORT = config.PORT || 8080;
const PREFIX = config.PREFIX || '/';


async function bootstrap() {

  const logger: Logger = new Logger('main.ts');

  const app = await NestFactory.create(AppModule, {
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });

  app.enableCors();

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI, 
  });

  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT, () => {
    logger.log(`server running in the port ${PORT}/${PREFIX}`)
  })




}
bootstrap();
