import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'

const prisma = new PrismaClient()

const countris = ['RU', 'AU', 'HU', 'RO']



async function main() {
  const NUM_USER = 200

  for (let i = 0; i < NUM_USER; i++) {
    const email = faker.internet.email()
    const name = faker.person.firstName()
    const avatarPath = faker.image.avatar()
    const password = await hash('123456')

    const country = faker.helpers.arrayElement(countris)
    const createdAt = faker.date.past({ years: 1 })
    const updatedAt = new Date(
      createdAt.getTime() +
        Math.random() * new Date().getTime() -
        createdAt.getTime()
    )

    await prisma.user.create({
      data: {
        email,
        name,
        avatarPath,
        password,
        country,
        createdAt,
        updatedAt
      }
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect
  })
