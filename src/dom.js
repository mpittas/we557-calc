import { translations } from "./translations.js";
import { validateBirthDate } from "./utils/validators.js";
import { updateLanguage, getCurrentLang } from "./language/languageManager.js";
import { updateCompatibility } from "./compatibility/compatibilityManager.js";
import { getRandomName, getRandomDate } from "./utils/randomDataGenerator.js";
import { calculateSoulNumber } from "./calculations/soulNumberCalculations.js";
import {
  calculateDateOfBirth,
  calculateDateMonthSum,
} from "./calculations/dateCalculations.js";

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
    alert(translations[getCurrentLang()].invalidDate);
    return;
  }
  if (!name) {
    alert(translations[getCurrentLang()].enterName);
    return;
  }

  const soulNumberResult = calculateSoulNumber(day, month, year);
  const dateOfBirthResult = calculateDateOfBirth(day);
  const dateMonthResult = calculateDateMonthSum(day, month);

  // Render the results
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
                ${soulNumberResult.number}
              </div>  
              <h4 class="text-lg font-semibold text-gray-100">Съдбовно число</h4>
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${soulNumberResult.calculation}
          </div>
        </div>

        <!-- Second Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
                ${dateOfBirthResult.number}
              </div>  
              <h4 class="text-lg font-semibold text-gray-100">Число на душата</h4>
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${dateOfBirthResult.calculation}
          </div>
        </div>

        <!-- Third Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <h4 class="text-lg font-semibold text-gray-100">Сума от дата и месец</h4>
            </div>
            <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
              ${dateMonthResult.sum}
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${dateMonthResult.calculation}
          </div>
        </div>
      </div>
    </div>
  `;

  // Store the calculated data
  const personData = {
    name,
    day,
    month,
    year,
    soulNumber: soulNumberResult.number,
  };
  if (personNum === 1) {
    window.person1Data = personData;
  } else {
    window.person2Data = personData;
  }

  if (window.person1Data && window.person2Data) {
    updateCompatibility();
  }
}

// Initialize event listeners when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  // Test DOM element access
  const elements = [
    "name1",
    "name2",
    "day1",
    "day2",
    "month1",
    "month2",
    "year1",
    "year2",
    "calculate1",
    "calculate2",
  ];
  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Element with id '${id}' not found`);
    }
  });

  // Populate fields with random names and dates
  for (let i = 1; i <= 2; i++) {
    document.getElementById(`name${i}`).value = getRandomName();
    const { day, month, year } = getRandomDate();
    document.getElementById(`day${i}`).value = day;
    document.getElementById(`month${i}`).value = month;
    document.getElementById(`year${i}`).value = year;
  }

  document
    .getElementById("calculate1")
    .addEventListener("click", () => calculatePersonSoulNumber(1));
  document
    .getElementById("calculate2")
    .addEventListener("click", () => calculatePersonSoulNumber(2));

  // Initialize language settings
  updateLanguage(getCurrentLang());
});
