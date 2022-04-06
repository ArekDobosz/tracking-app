import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRandomCord } from 'utility/generateRandomCord';
import { prismaClient } from 'utility/prisma';

const totalItems = 100;
const fetchItemsPerRequest = 100;
const posibbleLastStartItem = totalItems - fetchItemsPerRequest;
const getStartItem = () =>
  Math.floor(Math.random() * posibbleLastStartItem + 1);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  if (method === 'PATCH') {
    try {
      const randomPositions = await prismaClient.position.findMany({
        skip: getStartItem(),
        take: fetchItemsPerRequest,
      });

      for (const { carId, lat, lng } of randomPositions) {
        await prismaClient.position.create({
          data: {
            carId,
            lat: generateRandomCord(lat),
            lng: generateRandomCord(lng),
          },
        });
      }

      res.status(200).json({ pos: randomPositions });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};
