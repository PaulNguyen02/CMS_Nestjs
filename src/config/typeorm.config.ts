import { config } from 'dotenv';
import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from 'path';
config();
const configure = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', 'modules', '**', 'entities', '*.entity.{ts,js}')], //dirname lúc này nằm trong folder config chứa file này, cần lui ra
  migrations: [join(__dirname, '..', 'database', 'migrations', '*.ts')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

export default registerAs('typeorm', () => configure)
export const connectionSource = new DataSource(configure as DataSourceOptions);
