// 54.44945694743926, 18.570083635924906

const rand = () => Math.random() / 100;

export const generateRandomCord = (cord: number) => {
  const r = Math.floor(rand() * 100) % 2 === 0;
  const randomValue = rand();
  return r ? cord + randomValue : cord - randomValue;
};
