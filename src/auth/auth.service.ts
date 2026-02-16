import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return { message: 'User registered successfully', user };
  }

  async login(data: any) {

  console.log("LOGIN DATA:", data);

  const users = await this.usersService.findAll();
  console.log("DB USERS:", users);

  const user = users.find(u => u.email === data.email);
  console.log("FOUND USER:", user);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  console.log("PASSWORD MATCH:", isPasswordValid);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user.id, role: user.role };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
