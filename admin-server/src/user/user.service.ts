import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { CreateUserDto, UpdateUserDto } from 'src/dto/create-user.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async create({ password, ...dto }: CreateUserDto) {
    const user = {
      ...dto,
      password: await hash(password)
    }
    return this.prisma.user.create({
      data: user
    })
  }
  async update(id: number, { password, ...data }: UpdateUserDto) {
    await this.findById(id)

    const hashedPassword = password ? { password: await hash(password) } : {}

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        ...data,
        ...hashedPassword
      }
    })
  }
}
