import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.schema';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from '../auth/dto/register.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async upsertUser(createUserInput: RegisterUserDTO) {
    const existingUser = await this.repository.findOne({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      return existingUser;
    }
    const newUser = this.repository.create(createUserInput);
    return this.repository.save(newUser);
  }

  async findOneByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async resetPassword(email: string) {
    const existingUser = this.repository.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not Found');
    }
    // WIP add sendMail with link also expiry Functionality
    return 'Password Reset Mail Sent Successfully';
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
    const { password } = updateUserInput;

    if (password) {
      updateUserInput.password = await bcrypt.hash(password, 10);
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
