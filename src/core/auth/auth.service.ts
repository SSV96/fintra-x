import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RolesEnum } from 'src/common/enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterUserDTO,
  ): Promise<{ accessToken: string }> {
    const { password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    registerDto.password = hashedPassword;
    const user = await this.userService.upsertUser(registerDto);

    const payload = {
      email: user.email,
      userId: user.id,
      role: RolesEnum.USER,
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      userId: user.id,
      role: RolesEnum.USER,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
