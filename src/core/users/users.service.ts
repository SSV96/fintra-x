import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.repository.findOne({
      where: { email: createUserInput.email },
    });
    if (user) {
      return user;
    }
    const newUser = this.repository.create(createUserInput);
    return this.repository.save(newUser);
  }

  async findAll() {
    const users = await this.repository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(updateUserInput: UpdateUserInput) {
    const user = await this.repository.findOne({
      where: { id: updateUserInput.id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = Object.assign(user, updateUserInput);

    return this.repository.save(updated);
  }

  async remove(id: string): Promise<string> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return `User #${id} deleted successfully`;
  }
}
