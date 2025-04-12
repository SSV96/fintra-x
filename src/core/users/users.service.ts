import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { UpdateUserInput } from './graphql/inputs/update-user.input';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return {
      username: createUserInput.username,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
