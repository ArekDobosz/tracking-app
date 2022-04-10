import { generateRandomCord } from '../utility/generateRandomCord';
import { prismaClient } from '../utility/prisma';

const lat = 54.43047329917815;
const lng = 18.53338886216462;

const startItem = 1000;
const totalItems = 100;

const regNumbers: string[] = [];
for (let i = startItem; i < startItem + totalItems; i++) {
  regNumbers.push(`GD ${i}`);
}

async function main() {
  await prismaClient.position.deleteMany({});
  await prismaClient.car.deleteMany({});

  await Promise.all(
    regNumbers.map((regNumber) =>
      prismaClient.car.create({
        data: {
          regNumber,
          position: {
            create: [
              { lat: generateRandomCord(lat), lng: generateRandomCord(lng) },
            ],
          },
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
