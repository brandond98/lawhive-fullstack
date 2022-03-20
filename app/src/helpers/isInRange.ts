export const isInRange = (
  expectedSettlement: number,
  actualSettlement: number,
): Boolean => {
  const lowestPossibility = expectedSettlement - expectedSettlement / 10;
  if (actualSettlement < lowestPossibility) {
    return false;
  }
  return true;
};
