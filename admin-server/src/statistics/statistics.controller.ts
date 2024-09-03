import { Controller, Get } from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { Auth } from 'src/decorators/auth.decorator'

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Auth('ADMIN')
  @Get('/registration-by-mouth')
  getRegistrationsByMonth() {
    return this.statisticsService.getUserRegistrationsByMouth()
  }

  @Auth('ADMIN')
  @Get('/numbers')
  getNumbers() {
    return this.statisticsService.getNumbers()
  }

  @Auth('ADMIN')
  @Get('count-by-country')
  getCountByCountry() {
    return this.statisticsService.getUserCountByCountry()
  }
}
