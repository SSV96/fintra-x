import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { RegisterUserInput } from './inputs/register-user.input';
import { UserLoginInput } from './inputs/user-login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }

  @Mutation()
  login(@Args('userLoginInput') userLoginInput: UserLoginInput) {
    return this.authService.login(userLoginInput);
  }
}
