import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const user = await this.usersService.create(dto);

    const payload = { sub: user._id, email: user.email };
    const token = this.jwt.sign(payload);

    const userObj = user.toObject();
    delete userObj.password;

    return {
      message: 'Signup successful',
      accessToken: token,
      user: userObj,
    };
  }

  async login(dto: LoginDto) {
  const user = (await this.usersService.findByEmail(dto.email)) as UserDocument | null;

  if (!user || !(await user.comparePassword(dto.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user._id, email: user.email };
  const token = this.jwt.sign(payload);

  const userObj = user.toObject();
  delete userObj.password;

  return {
    message: 'Login successful',
    accessToken: token,
    user: userObj,
  };
}
}