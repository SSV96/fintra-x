import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './postgres/postgres.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [ConfigModule, PostgresModule, GraphqlModule],
  exports: [ConfigModule, PostgresModule, GraphqlModule],
})
export class CommonModule {}
