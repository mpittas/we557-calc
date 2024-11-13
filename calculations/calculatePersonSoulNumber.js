import { translations } from "../translations.js";
import {
  calculateInitialSum,
  calculateSoulNumber,
  formatCalculation,
  validateBirthDate,
} from "../utils.js";

export function calculatePersonSoulNumber(personNum) {
  const dayInput = document.getElementById(`day${personNum}`);
  const monthInput = document.getElementById(`month${personNum}`);
  const yearInput = document.getElementById(`year${personNum}`);
  const nameInput = document.getElementById(`name${personNum}`);
  const resultDiv = document.getElementById(`result${personNum}`);

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);
  const name = nameInput.value.trim();

  if (!validateBirthDate(day, month, year)) {
    alert(translations[currentLang].invalidDate);
    return;
  }
  if (!name) {
    alert(translations[currentLang].enterName);
    return;
  }

  const dateString = `${day}${month}${year}`;
  const initialSum = calculateInitialSum(day, month, year);
  const soulNumber = calculateSoulNumber(initialSum);

  // Calculate date of birth number
  let dateOfBirthNumber = day;
  let dateOfBirthCalculation = `${day}`;
  if (dateOfBirthNumber === 13) {
    dateOfBirthNumber = 1 + 3;
    dateOfBirthCalculation = "1 + 3 = 4";
  }

  // Calculate date and month sum with detailed steps
  let dateMonthSum = 0;
  let dateMonthCalculation = "";

  // First step: adding day and month
  dateMonthSum = day + month;
  dateMonthCalculation = `${day} + ${month} = ${dateMonthSum}`;

  // Second step: if sum is greater than 9, reduce it
  if (dateMonthSum > 9) {
    const digits = dateMonthSum.toString().split("");
    let reducedSum = 0;
    const reductionSteps = digits
      .map((digit, index) => {
        reducedSum += parseInt(digit);
        if (index === digits.length - 1) {
          return `${digit} = ${reducedSum}`;
        }
        return digit;
      })
      .join(" + ");
    dateMonthCalculation += ` → ${reductionSteps}`;
    dateMonthSum = reducedSum;

    // Third step: if still greater than 9, reduce again
    if (reducedSum > 9) {
      const finalDigits = reducedSum.toString().split("");
      let finalSum = 0;
      const finalSteps = finalDigits
        .map((digit, index) => {
          finalSum += parseInt(digit);
          if (index === finalDigits.length - 1) {
            return `${digit} = ${finalSum}`;
          }
          return digit;
        })
        .join(" + ");
      dateMonthCalculation += ` → ${finalSteps}`;
      dateMonthSum = finalSum;
    }
  }

  resultDiv.innerHTML = `
    <div>
      <div class="flex items-center justify-between pb-4">
        <h3 class="text-2xl font-bold text-gray-100">${name}</h3>
      </div>
      
      <div class="space-y-6">
        <!-- First Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
                ${soulNumber}
              </div>  
              <h4 class="text-lg font-semibold text-gray-100">Съдбовно число</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Сборът от всички цифри в датата на раждане, редуциран до едноцифрено число
                </div>
              </div>
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${formatCalculation(dateString, initialSum, soulNumber)}
          </div>
        </div>

        <!-- Second Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
                ${dateOfBirthNumber}
              </div>  
              <h4 class="text-lg font-semibold text-gray-100">Число на душата</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Числото от деня на раждане, редуцирано ако е по-голямо от 9
                </div>
              </div>
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${dateOfBirthCalculation}
          </div>
        </div>

        <!-- Third Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <h4 class="text-lg font-semibold text-gray-100">Сума от дата и месец</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Сборът от деня и месеца на раждане
                </div>
              </div>
            </div>
            <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
              ${dateMonthSum}
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${dateMonthCalculation}
          </div>
        </div>
      </div>
    </div>
  `;

  // Store the calculated data
  const personData = { name, day, month, year, soulNumber };
  if (personNum === 1) {
    window.person1Data = personData;
  } else {
    window.person2Data = personData;
  }

  // Update compatibility if both calculations are done
  if (window.person1Data && window.person2Data) {
    updateCompatibility();
  }
}
