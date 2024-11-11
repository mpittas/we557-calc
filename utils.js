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
  // First equation: showing all digits being added with actual sum
  const digits = dateString.split("");
  let runningSum = 0;
  const firstSteps = digits
    .map((digit, index) => {
      runningSum += parseInt(digit);
      if (index === digits.length - 1) {
        return `${digit} = ${runningSum}`;
      }
      return digit;
    })
    .join(" + ");

  // Second equation: if needed, show the actual addition of digits
  let secondEquation = "";
  if (runningSum > 12) {
    const initialSumDigits = runningSum.toString().split("");
    let secondRunningSum = 0;
    const secondSteps = initialSumDigits
      .map((digit, index) => {
        secondRunningSum += parseInt(digit);
        if (index === initialSumDigits.length - 1) {
          return `${digit} = ${secondRunningSum}`;
        }
        return digit;
      })
      .join(" + ");
    secondEquation = ` → ${secondSteps}`;

    // If we need a third reduction
    if (secondRunningSum > 12) {
      const secondSumDigits = secondRunningSum.toString().split("");
      let finalSum = 0;
      const finalSteps = secondSumDigits
        .map((digit, index) => {
          finalSum += parseInt(digit);
          if (index === secondSumDigits.length - 1) {
            return `${digit} = ${finalSum}`;
          }
          return digit;
        })
        .join(" + ");
      secondEquation += ` → ${finalSteps}`;
    }
  }

  return firstSteps + secondEquation;
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
