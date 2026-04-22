import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config({ path: '.env' });

export const TypeOrmConfigHelper = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export const dataSourceOptions = {
  type: 'postgres',
  host: TypeOrmConfigHelper.DB_HOST,
  port: parseInt(TypeOrmConfigHelper.DB_PORT || '5432'),
  username: TypeOrmConfigHelper.DB_USER,
  password: TypeOrmConfigHelper.DB_PASSWORD,
  database: TypeOrmConfigHelper.DB_NAME,
  entities: [`dist/**/*.entity.{ts,js}`, `dist/**/*.view.{ts,js}`],
  subscribers: [`dist/**/subscribers/*.subscribers.{ts,js}`],
  migrations: [`dist/migrations/*.{ts,js}`],
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
  logging: 'all',
  synchronize: false,
  autoLoadEntities: true,
  poolSize: 100,
  invalidWhereValuesBehavior: {
    null: 'sql-null',
    undefined: 'throw',
  },
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
