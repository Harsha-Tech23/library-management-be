import { Controller, Get, Post, Body, Param ,Patch} from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch('reset-password/:id')
resetPassword(
  @Param('id') id: number,
  @Body() body: any
) {

  return this.usersService.resetPassword(id, body.newPassword);

}
}

