import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './app.config';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbConfig = databaseConfig();

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || dbConfig.host,
    port: configService.get<number>('DB_PORT') || dbConfig.port,
    username: configService.get<string>('DB_USERNAME') || dbConfig.username,
    password: configService.get<string>('DB_PASSWORD') || dbConfig.password,
    database: configService.get<string>('DB_DATABASE') || dbConfig.database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  };
};
