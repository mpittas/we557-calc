// Calculation utilities
export function calculateInitialSum(day, month, year) {
  const dateString = `${day}${month}${year}`;
  return dateString.split('').reduce((a, b) => a + parseInt(b), 0);
}

export function calculateSoulNumber(num) {
  if (num <= 12) return num;
  if (num === 22) return 22; // Master number
  return String(num).split('').reduce((a, b) => a + parseInt(b), 0);
}

export function formatCalculation(dateString, initialSum, soulNumber) {
  return `${dateString.split('').join(' + ')} = ${initialSum}${
    initialSum > 12 ? ` → ${initialSum.toString().split('').join(' + ')} = ${soulNumber}` : ''
  }`;
}

export function validateBirthDate(day, month, year) {
  return (
    day && day >= 1 && day <= 31 &&
    month && month >= 1 && month <= 12 &&
    year && year >= 1000 && year <= 9999
  );
}