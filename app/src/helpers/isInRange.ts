export const isInRange = (
  expectedSettlement: number,
  actualSettlement: number,
): Boolean => {
  // Calculate 10% less than expected settlement amount
  const lowestPossibility = expectedSettlement - expectedSettlement / 10;
  // Check if user entered settlement in range
  if (actualSettlement < lowestPossibility) {
    return false;
  }
  return true;
};
