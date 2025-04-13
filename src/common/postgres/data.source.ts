import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv-flow';
import * as path from 'path';
dotenv.config({ silent: true });
const isLocal = process.env.NODE_ENV === 'local';
export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: false,
  entities: [path.join(__dirname, '../../**/*.schema.{ts,js}')],
  migrations: [
    path.join(__dirname, '../../common/postgres/migrations/*.{ts,js}'),
  ],
  logging: isLocal,
  ssl: isLocal,
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
