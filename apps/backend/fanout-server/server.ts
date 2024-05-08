import { prisma } from "./prisma" // import your extended Prisma Client instance

async function main() {
  const subscription = await prisma.notification.subscribe()

  for await (const event of subscription) {
    console.log('New event:', event)
  }
}

main()
