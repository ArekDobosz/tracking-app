const rand = () => Math.random() / 100;

export const generateRandomCord = (cord: number) => {
  const r = Math.floor(rand() * 100) % 2 === 0;
  const randomValue = rand();
  return r ? cord + randomValue : cord - randomValue;
};
