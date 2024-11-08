import { translations } from "./translations.js";
import {
  calculateInitialSum,
  calculateSoulNumber,
  formatCalculation,
  validateBirthDate,
  getCompatibilityMessage,
} from "./utils.js";

let currentLang = "bg";

export function updateLanguage(lang) {
  currentLang = lang;
  document.querySelector("h1").textContent = translations[lang].title;
  document.getElementById("name1").placeholder =
    translations[lang].enterFirstName;
  document.getElementById("name2").placeholder =
    translations[lang].enterSecondName;
  document.getElementById("day1").placeholder = translations[lang].birthDay;
  document.getElementById("month1").placeholder = translations[lang].birthMonth;
  document.getElementById("year1").placeholder = translations[lang].birthYear;
  document.getElementById("day2").placeholder = translations[lang].birthDay;
  document.getElementById("month2").placeholder = translations[lang].birthMonth;
  document.getElementById("year2").placeholder = translations[lang].birthYear;
  document.getElementById("calculate1").textContent =
    translations[lang].calculate;
  document.getElementById("calculate2").textContent =
    translations[lang].calculate;

  const result1 = document.getElementById("result1");
  const result2 = document.getElementById("result2");
  if (result1.innerHTML || result2.innerHTML) {
    updateCompatibility();
  }
}

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

  // Изчисляване на число от дата на раждане
  let dateOfBirthNumber = day;
  let dateOfBirthCalculation = `${day}`;
  if (dateOfBirthNumber === 13) {
    dateOfBirthNumber = 1 + 3;
    dateOfBirthCalculation = "1 + 3 = 4";
  }

  // Изчисляване на сума от дата и месец
  let dateMonthSum = day + month;
  let dateMonthCalculation = `${day} + ${month} = ${dateMonthSum}`;
  if (dateMonthSum > 9) {
    dateMonthCalculation += ` → ${dateMonthSum
      .toString()
      .split("")
      .join(" + ")} = ${dateMonthSum}`;
  }

  resultDiv.innerHTML = `
    <div>
      <div class="flex items-center justify-between border-b border-pink-200 pb-4 mb-4">
        <h3 class="text-2xl font-bold text-gray-800">${name}</h3>
      </div>
      
      <div class="space-y-6">
        <!-- First Calculation -->
        <div class="bg-white/80 backdrop-blur rounded-xl p-5 shadow-sm">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <h4 class="text-lg font-semibold text-gray-800">Съдбовно число</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Сборът от всички цифри в датата на раждане, редуциран до едноцифрено число
                </div>
              </div>
            </div>
            <div class="w-6 h-6 flex items-center justify-center bg-pink-500 text-white text-sm rounded-full font-bold">
              ${soulNumber}
            </div>
          </div>
          <div class="font-mono bg-gradient-to-r from-pink-50 to-white p-4 rounded-lg text-gray-800 shadow-inner border border-pink-100">
            ${formatCalculation(dateString, initialSum, soulNumber)}
          </div>
        </div>

        <!-- Second Calculation -->
        <div class="bg-white/80 backdrop-blur rounded-xl p-5 shadow-sm">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <h4 class="text-lg font-semibold text-gray-800">Число на душата</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Числото от деня на раждане, редуцирано ако е по-голямо от 9
                </div>
              </div>
            </div>
            <div class="w-6 h-6 flex items-center justify-center bg-pink-500 text-white text-sm rounded-full font-bold">
              ${dateOfBirthNumber}
            </div>
          </div>
          <div class="font-mono bg-gradient-to-r from-pink-50 to-white p-4 rounded-lg text-gray-800 shadow-inner border border-pink-100">
            ${dateOfBirthCalculation}
          </div>
        </div>

        <!-- Third Calculation -->
        <div class="bg-white/80 backdrop-blur rounded-xl p-5 shadow-sm">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <h4 class="text-lg font-semibold text-gray-800">Сума от дата и месец</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Сборът от деня и месеца на раждане, редуциран ако е по-голям от 9
                </div>
              </div>
            </div>
            <div class="w-6 h-6 flex items-center justify-center bg-pink-500 text-white text-sm rounded-full font-bold">
              ${dateMonthSum}
            </div>
          </div>
          <div class="font-mono bg-gradient-to-r from-pink-50 to-white p-4 rounded-lg text-gray-800 shadow-inner border border-pink-100">
            ${dateMonthCalculation}
          </div>
        </div>
      </div>
    </div>
  `;

  updateCompatibility();
}

function getCompatibilityDescription(number) {
  const descriptions = {
    1: "Число 1 е лидер и иноватор, обича независимостта и амбицията.",
    2: "Число 2 е дипломатично и кооперативно, цени хармонията и партньорството.",
    3: "Число 3 е креативно и социално, обича изразяването и оптимизма.",
    4: "Число 4 е стабилно и практично, обича реда и сигурността.",
    5: "Число 5 е авантюристично и гъвкаво, цени свободата и разнообразието.",
    6: "Число 6 е грижовно и отговорно, обича хармонията и семейството.",
    7: "Число 7 е аналитично и духовно, обича интроспекцията и философията.",
    8: "Число 8 е амбициозно и влиятелно, обича успеха и материалните постижения.",
    9: "Число 9 е състрадателно и идеалистично, обича да помага на другите и да се чувства част от общността.",
    11: "Число 11 е интуитивно и духовно, обича дълбоките връзки и интуицията.",
    22: "Число 22 е майстор строител, практичен визионер и мощен постигащ.",
  };
  return descriptions[number] || "Няма описание за това число.";
}

export function updateCompatibility() {
  const result1 = document.getElementById("result1");
  const result2 = document.getElementById("result2");
  const compatibilityDiv = document.getElementById("compatibility");

  if (!result1.innerHTML || !result2.innerHTML) return;

  // Get soul numbers (from the first calculation)
  const soulNumber1 = parseInt(
    result1.querySelector(".bg-pink-500").textContent.trim()
  );
  const soulNumber2 = parseInt(
    result2.querySelector(".bg-pink-500").textContent.trim()
  );

  // Get birth date numbers (from the second calculation)
  const birthNumber1 = parseInt(
    result1.querySelectorAll(".font-mono")[1].textContent.split("=").pop()
  );
  const birthNumber2 = parseInt(
    result2.querySelectorAll(".font-mono")[1].textContent.split("=").pop()
  );

  // Get date-month sum numbers (from the third calculation)
  const dateMonthNumber1 = parseInt(
    result1.querySelectorAll(".font-mono")[2].textContent.split("=").pop()
  );
  const dateMonthNumber2 = parseInt(
    result2.querySelectorAll(".font-mono")[2].textContent.split("=").pop()
  );

  const name1 = result1.querySelector(".text-2xl").textContent;
  const name2 = result2.querySelector(".text-2xl").textContent;

  compatibilityDiv.innerHTML = `
    <div class="space-y-8">
      <div class="flex items-center justify-between border-b border-pink-200 pb-4">
        <h3 class="text-2xl font-bold text-gray-800">Съвместимост на числата</h3>
      </div>
      
      <div class="space-y-8">
        <!-- First Compatibility Section -->
        <div class="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div>
              <h4 class="text-xl font-semibold text-gray-800">Съвместимост на Съдбовните Числа</h4>
              <p class="text-gray-600 text-sm mt-1">Числа ${soulNumber1} и ${soulNumber2}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-pink-50 to-white p-5 rounded-lg border border-pink-100">
              <p class="text-gray-800 mb-4">
                <span class="font-semibold text-gray-700">${name1}:</span> 
                <span class="text-gray-700">${getCompatibilityDescription(
                  soulNumber1
                )}</span>
              </p>
              <p class="text-gray-800">
                <span class="font-semibold text-gray-700">${name2}:</span> 
                <span class="text-gray-700">${getCompatibilityDescription(
                  soulNumber2
                )}</span>
              </p>
            </div>
            <div class="bg-pink-50/80 backdrop-blur p-5 rounded-lg text-gray-700 italic border border-pink-100">
              ${getCompatibilityMessage(
                soulNumber1,
                soulNumber2,
                translations,
                currentLang
              )}
            </div>
          </div>
        </div>

        <!-- Second Compatibility Section -->
        <div class="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div>
              <h4 class="text-xl font-semibold text-gray-800">Съвместимост на Числата от Дата на Раждане</h4>
              <p class="text-gray-600 text-sm mt-1">Числа ${birthNumber1} и ${birthNumber2}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-pink-50 to-white p-5 rounded-lg border border-pink-100">
              <p class="text-gray-800 mb-4">
                <span class="font-semibold text-gray-700">${name1}:</span> 
                <span class="text-gray-700">${getCompatibilityDescription(
                  birthNumber1
                )}</span>
              </p>
              <p class="text-gray-800">
                <span class="font-semibold text-gray-700">${name2}:</span> 
                <span class="text-gray-700">${getCompatibilityDescription(
                  birthNumber2
                )}</span>
              </p>
            </div>
            <div class="bg-pink-50/80 backdrop-blur p-5 rounded-lg text-gray-700 italic border border-pink-100">
              ${getCompatibilityMessage(
                birthNumber1,
                birthNumber2,
                translations,
                currentLang
              )}
            </div>
          </div>
        </div>

        <!-- Third Compatibility Section -->
        <div class="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div>
              <h4 class="text-xl font-semibold text-gray-800">Съвместимост на Сумите от Дата и Месец</h4>
              <p class="text-gray-600 text-sm mt-1">Числа ${dateMonthNumber1} и ${dateMonthNumber2}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-pink-50 to-white p-5 rounded-lg border border-pink-100">
              <p class="text-gray-800 mb-4">
                <span class="font-semibold text-gray-700">${name1}:</span> 
                <span class="text-gray-700">${getCompatibilityDescription(
                  dateMonthNumber1
                )}</span>
              </p>
              <p class="text-gray-800">
                <span class="font-semibold text-gray-700">${name2}:</span> 
                <span class="text-gray-700">${getCompatibilityDescription(
                  dateMonthNumber2
                )}</span>
              </p>
            </div>
            <div class="bg-pink-50/80 backdrop-blur p-5 rounded-lg text-gray-700 italic border border-pink-100">
              ${getCompatibilityMessage(
                dateMonthNumber1,
                dateMonthNumber2,
                translations,
                currentLang
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getRandomName() {
  const names = [
    "Александър",
    "Мария",
    "Иван",
    "Елена",
    "Георги",
    "Анна",
    "Димитър",
    "София",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomDate() {
  const day = Math.floor(Math.random() * 31) + 1; // Random day between 1 and 31
  const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
  const currentYear = new Date().getFullYear(); // Get the current year
  const year = Math.floor(Math.random() * (currentYear - 1900 + 1)) + 1900; // Random year between 1900 and current year
  return { day, month, year };
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
});
