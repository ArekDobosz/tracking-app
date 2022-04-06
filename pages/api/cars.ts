import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from 'utility/prisma';

type ApiRequest = Omit<NextApiRequest, 'query'> & {
  query: { searchBy: string };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: ApiRequest, res: NextApiResponse): Promise<void> => {
  const { method, query } = req;
  if (method === 'GET') {
    try {
      const { searchBy } = query;
      const cars = await prismaClient.car.findMany({
        include: {
          position: {
            orderBy: [{ createdAt: 'desc' }],
            take: 1,
          },
        },
        where: {
          regNumber: {
            contains: searchBy,
          },
        },
      });
      res.status(200).json(cars);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};
