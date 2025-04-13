import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './graphql/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // Add your entities here
  controllers: [],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
