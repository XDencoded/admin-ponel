import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { PaginationArgsWithSearchTerm } from 'src/base/pagination/pagination.args'
import { Auth } from 'src/decorators/auth.decorator'
import { CreateUserDto, UpdateUserDto } from 'src/dto/create-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth('ADMIN')
  @Get()
  async getList(@Query() params: PaginationArgsWithSearchTerm) {
    return this.userService.findAll(params)
  }

  @Auth('ADMIN')
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.userService.findById(+id)
  }

  @Auth('ADMIN')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Auth('ADMIN')
  @Post(':id')
  async updateUser(@Param() id: string, @Body() updateDto: UpdateUserDto) {
    return this.userService.update(+id, updateDto)
  }

  @Auth('ADMIN')
  @Post(':id')
  async deleteUser(@Param() id: string) {
    return this.userService.delete(id)
  }
}
