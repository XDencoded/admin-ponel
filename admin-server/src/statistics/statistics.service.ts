import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import * as dayjs from './../../node_modules/dayjs/esm/index'

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getUserRegistrationsByMouth() {
    const currentMouth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const startDate = new Date(currentYear - 1, currentMouth + 1, 1)

    const endDate = new Date(currentYear, currentMouth + 1, 0)

    const allMouths = this.generateMonths(startDate, endDate)

    const registrations = await this.prisma.user.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: {
        createdAt: 'asc'
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    })

    const registrationMap = new Map<string, number>()

    for (const reg of registrations) {
      const month = reg.createdAt.getMonth() + 1

      const year = reg.createdAt.getFullYear()
      const key = `${year}-${month}`

      if (registrationMap.has(key)) {
        registrationMap.set(key, registrationMap.get(key) + reg._count)
      } else {
        registrationMap.set(key, reg._count)
      }
    }
    return allMouths.map(({ month, year }) => {
      const key = `${year}-${month}`
      const monthName = dayjs(new Date(year, month - 1)).format('MMMM')

      return {
        month: monthName,
        year,
        count: registrationMap.get(key) || 0
      }
    })
  }

  async getNumbers() {
    const usersCount = await this.prisma.user.count()

    const activeUsersCount = await this.prisma.user.count({
      where: {
        updatedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    })

    const newUsersLastMouth = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    })

    const uniqueCountriesCount = await this.prisma.user.groupBy({
      by: ['country'],
      _count: {
        country: true
      },
      where: {
        country: {
          not: null
        }
      }
    })

    return [
      {
        name: 'Users',
        value: usersCount
      },
      {
        name: 'Active Users',
        value: activeUsersCount
      },
      {
        name: 'Last Month',
        value: newUsersLastMouth
      },
      {
        name: 'Countries',
        value: uniqueCountriesCount.length
      }
    ]
  }

  async getUserCountByCountry() {
    const result = await this.prisma.user.groupBy({
      by: ['country'],
      _count: {
        country: true
      },
      where: {
        country: {
          not: null
        }
      },
      orderBy: {
        _count: {
          country: 'desc'
        }
      }
    })

    return result.map(item => ({
      country: item.country,
      count: item._count.country
    }))
  }

  private generateMonths(
    start: Date,
    end: Date
  ): { month: number; year: number }[] {
    const currant = new Date(start)
    const endMonth = new Date(end)
    const months = []

    while (currant < endMonth) {
      months.push({
        month: currant.getMonth() + 1,
        year: currant.getFullYear()
      })
      currant.setMonth(currant.getMonth() + 1)
    }
    months.push({
      month: currant.getMonth() + 1,
      year: currant.getFullYear()
    })
    return months
  }
}
