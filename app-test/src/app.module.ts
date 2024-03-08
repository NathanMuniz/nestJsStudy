import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import {
  LoggerInterceptor,
  RedisCacheInterceptor,
  RedisLimitInterceptor,
  ApiInterceptor,
} from './interceptors';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe } from './pipe/validation.pipe';
import { getConfig } from './utils';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';
import { PluginModule } from './plugin/plugin.module';
import { config } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true, 
      load: [getConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactoy: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: String(ConfigService.get('datasource.host')),
        port: Number.parseInt(ConfigService.get('datasource.port') ?? '3306'),
        username: String(ConfigService.get('datasource.username')),
        password: String(ConfigService.get('datasource.password')),
        database: [__dirname + '/**/*.entity{.ts,.js}'],
        loggin: ConfigService.get('datasource.loggin'),
        timezone: '+008:00',
        cache: {
          duration: 60000,
        },
        extra: {
          pollMax: 32,
          pollMin: 16,
          queueTimeout: 60000,
          pollPingInteval: 60,
          pollTimeout: 60,
        },
      }),
    }),
    ApiModule,
    SharedModule,
    PluginModule,

  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RedisLimitInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RedisCacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}
