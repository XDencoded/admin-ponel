import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { OnlyAdminGuard } from 'src/guards/admin.guard'
import { JwtAuthGuard } from 'src/guards/jwt.guard'

export const Auth = (role: Role = Role.USER) => {
  if (role === Role.ADMIN) {
    return applyDecorators(UseGuards(JwtAuthGuard, OnlyAdminGuard))
  }

  return applyDecorators(UseGuards(JwtAuthGuard))
}
