export function calculateInitialSum(day, month, year) {
  const dateString = `${day}${month}${year}`;
  return dateString.split("").reduce((a, b) => a + parseInt(b), 0);
}

export function calculateSoulNumber(num) {
  if (num === 22) return 22;
  if (num <= 12) return num;

  const secondSum = String(num)
    .split("")
    .reduce((a, b) => a + parseInt(b), 0);

  if (secondSum > 12) {
    return String(secondSum)
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }

  return secondSum;
}

export function formatCalculation(dateString, initialSum, soulNumber) {
  const firstEquation = `${dateString.split("").join(" + ")} = ${initialSum}`;
  const secondEquation =
    initialSum > 12
      ? ` → ${initialSum.toString().split("").join(" + ")} = ${soulNumber}`
      : "";
  return firstEquation + secondEquation;
}

export function validateBirthDate(day, month, year) {
  return (
    day &&
    day >= 1 &&
    day <= 31 &&
    month &&
    month >= 1 &&
    month <= 12 &&
    year &&
    year >= 1000 &&
    year <= 9999
  );
}

export function getCompatibilityMessage(num1, num2, translations, currentLang) {
  if ((num1 === 5 && num2 === 11) || (num1 === 11 && num2 === 5)) {
    return translations[currentLang].compatibility511;
  }
  return translations[currentLang].defaultCompatibility;
}
