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

  // Calculate date of birth number
  let dateOfBirthNumber = day;
  let dateOfBirthCalculation = `${day}`;
  if (dateOfBirthNumber === 13) {
    dateOfBirthNumber = 1 + 3;
    dateOfBirthCalculation = "1 + 3 = 4";
  }

  // Calculate date and month sum
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
      <div class="flex items-center justify-between pb-4">
        <h3 class="text-2xl font-bold text-gray-100">${name}</h3>
      </div>
      
      <div class="space-y-6">
        <!-- First Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
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
            <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
              ${soulNumber}
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
            <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
              ${dateOfBirthNumber}
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

function getCompatibilityDescription(number) {
  const descriptions = {
    1: "Число 1 е лиде�� и иноватор, обича независимостта и амбицията.",
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
  const compatibilityDiv = document.getElementById("compatibility");

  if (!window.person1Data || !window.person2Data) {
    return;
  }

  const person1 = window.person1Data;
  const person2 = window.person2Data;

  const compatibility = {
    score: calculateCompatibilityScore(person1.soulNumber, person2.soulNumber),
    description: getCompatibilityDescription(
      calculateCompatibilityScore(person1.soulNumber, person2.soulNumber)
    ),
  };

  compatibilityDiv.innerHTML = `
    <h2 class="text-xl md:text-2xl font-bold mb-4">Съвместимост</h2>
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="text-4xl font-bold text-violet-400 opacity-0 transition-opacity duration-500" id="compatScore">
          ${compatibility.score}%
        </div>
        <div class="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full bg-violet-400 rounded-full w-0 transition-all duration-1000 ease-out" id="compatBar"></div>
        </div>
      </div>
      <p class="text-gray-200 opacity-0 transition-opacity duration-500 delay-500" id="compatDesc">
        ${compatibility.description}
      </p>
      <div class="grid grid-cols-2 gap-4 mt-4 opacity-0 transition-opacity duration-500 delay-700" id="compatDetails">
        <div>
          <span class="text-gray-400">Житейски път ${person1.name}:</span>
          <span class="ml-2 font-bold">${person1.soulNumber}</span>
        </div>
        <div>
          <span class="text-gray-400">Житейски път ${person2.name}:</span>
          <span class="ml-2 font-bold">${person2.soulNumber}</span>
        </div>
      </div>
    </div>
  `;

  // Trigger animations after a short delay
  setTimeout(() => {
    const compatScore = document.getElementById("compatScore");
    const compatBar = document.getElementById("compatBar");
    const compatDesc = document.getElementById("compatDesc");
    const compatDetails = document.getElementById("compatDetails");

    // Animate score and progress bar
    compatScore.classList.remove("opacity-0");
    compatBar.style.width = `${compatibility.score}%`;

    // Animate description and details
    compatDesc.classList.remove("opacity-0");
    compatDetails.classList.remove("opacity-0");
  }, 100);
}

function calculateCompatibilityScore(num1, num2) {
  // Basic compatibility matrix
  const compatibilityMatrix = {
    1: { 1: 80, 2: 60, 3: 90, 4: 65, 5: 85, 6: 75, 7: 85, 8: 70, 9: 95 },
    2: { 1: 60, 2: 85, 3: 65, 4: 90, 5: 70, 6: 95, 7: 65, 8: 85, 9: 70 },
    3: { 1: 90, 2: 65, 3: 80, 4: 70, 5: 95, 6: 75, 7: 85, 8: 70, 9: 85 },
    4: { 1: 65, 2: 90, 3: 70, 4: 85, 5: 75, 6: 80, 7: 70, 8: 95, 9: 65 },
    5: { 1: 85, 2: 70, 3: 95, 4: 75, 5: 85, 6: 70, 7: 90, 8: 75, 9: 80 },
    6: { 1: 75, 2: 95, 3: 75, 4: 80, 5: 70, 6: 85, 7: 65, 8: 80, 9: 90 },
    7: { 1: 85, 2: 65, 3: 85, 4: 70, 5: 90, 6: 65, 7: 90, 8: 75, 9: 75 },
    8: { 1: 70, 2: 85, 3: 70, 4: 95, 5: 75, 6: 80, 7: 75, 8: 85, 9: 80 },
    9: { 1: 95, 2: 70, 3: 85, 4: 65, 5: 80, 6: 90, 7: 75, 8: 80, 9: 85 },
  };

  // Normalize numbers to 1-9 range if needed
  const norm1 =
    num1 > 9
      ? Number(
          String(num1)
            .split("")
            .reduce((a, b) => Number(a) + Number(b), 0)
        )
      : num1;
  const norm2 =
    num2 > 9
      ? Number(
          String(num2)
            .split("")
            .reduce((a, b) => Number(a) + Number(b), 0)
        )
      : num2;

  return compatibilityMatrix[norm1]?.[norm2] || 70;
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
