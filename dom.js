import { translations } from "./translations.js";
import {
  calculateInitialSum,
  calculateSoulNumber,
  formatCalculation,
  validateBirthDate,
  getCompatibilityMessage,
} from "./utils.js";
import { calculatePersonSoulNumber } from "./calculations/calculatePersonSoulNumber.js";

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

function getCompatibilityDescription(number) {
  const descriptions = {
    1: {
      title: "Съдбовно число 1",
      character: "Лидери, амбициозни, самоуверени.",
      strengths: "Инициативност, смелост, оригиналност.",
      challenges: "Склонност към егоизъм и доминиране.",
      professions: "Лидери, предприемачи, мениджъри.",
    },
    2: {
      title: "Съдбовно число 2",
      character: "Спокойни, дипломатични, интуитивни.",
      strengths: "Дипломатичност, сътрудничество, чувствителност.",
      challenges: "Нерешителност и зависимост от другите.",
      professions: "Консултанти, психолози, дипломати.",
    },
    3: {
      title: "Съдбовно число 3",
      character: "Творчески, оптимистични, изразителни.",
      strengths: "Общителност, креативност, чувство за хумор.",
      challenges: "Непостоянство и разпиляност.",
      professions: "Артисти, писатели, комуникатори.",
    },
    4: {
      title: "Съдбовно число 4",
      character: "Практични, трудолюбиви, стабилни.",
      strengths: "Надеждност, организираност, дисциплина.",
      challenges: "Консерватизъм и твърдост.",
      professions: "Инженери, строители, администратори.",
    },
    5: {
      title: "Съдбовно число 5",
      character: "Свободолюбиви, любопитни, адаптивни.",
      strengths: "Енергия, приспособимост, жажда за нови преживявания.",
      challenges: "Непостоянство и липса на фокус.",
      professions: "Пътешественици, писатели, медии.",
    },
    6: {
      title: "Съдбовно число 6",
      character: "Грижовни, отговорни, обичащи хармонията.",
      strengths: "Отдаденост, чувствителност към нуждите на другите.",
      challenges: "Прекалено желание да угодят на всички.",
      professions: "Лекари, учители, социални работници.",
    },
    7: {
      title: "Съдбовно число 7",
      character: "Мистични, интелектуални, търсещи.",
      strengths: "Дълбока мисъл, интуиция, философски дух.",
      challenges: "Изолация и склонност към прекомерно вглъбяване.",
      professions: "Учени, изследователи, философи.",
    },
    8: {
      title: "Съдбовно число 8",
      character: "Амбициозни, властни, материално ориентирани.",
      strengths: "Практичност, стремеж към успех, издръжливост.",
      challenges: "Склонност към прекален материализъм и контрол.",
      professions: "Бизнесмени, финансисти, администратори.",
    },
    9: {
      title: "Съдбовно число 9",
      character: "Идеалисти, хуманисти, състрадателни.",
      strengths: "Състрадание, щедрост, глобално мислене.",
      challenges: "Склонност към саможертва и прекалена емоционалност.",
      professions: "Филантропи, артисти, терапевти.",
    },
  };

  return (
    descriptions[number] || {
      title: "Няма описание",
      character: "Няма информация",
      strengths: "Няма информация",
      challenges: "Няма информация",
      professions: "Няма информация",
    }
  );
}

export function updateCompatibility() {
  const compatibilityDiv = document.getElementById("compatibility");

  if (!window.person1Data || !window.person2Data) {
    return;
  }

  const person1 = window.person1Data;
  const person2 = window.person2Data;
  const person1Desc = getCompatibilityDescription(person1.soulNumber);
  const person2Desc = getCompatibilityDescription(person2.soulNumber);

  const compatibility = {
    score: calculateCompatibilityScore(person1.soulNumber, person2.soulNumber),
  };

  compatibilityDiv.innerHTML = `
    <h2 class="text-xl md:text-2xl font-bold mb-4">Съвместимост</h2>
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <div class="text-4xl font-bold text-violet-400 opacity-0 transition-opacity duration-500" id="compatScore">
          ${compatibility.score}%
        </div>
        <div class="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full bg-violet-400 rounded-full w-0 transition-all duration-1000 ease-out" id="compatBar"></div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 opacity-0 transition-opacity duration-500 delay-700" id="compatDetails">
        <!-- Person 1 Details -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 space-y-4">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <h3 class="text-lg font-semibold">${person1.name}</h3>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Съдбовно число:</span>
              <span class="w-8 h-8 flex items-center justify-center bg-violet-600 text-white rounded-full font-bold">
                ${person1.soulNumber}
              </span>
            </div>
          </div>
          <div class="space-y-3">
            <div>
              <div class="text-violet-400 font-medium">Характер</div>
              <div class="text-gray-200">${person1Desc.character}</div>
            </div>
            <div>
              <div class="text-violet-400 font-medium">Силни страни</div>
              <div class="text-gray-200">${person1Desc.strengths}</div>
            </div>
            <div>
              <div class="text-violet-400 font-medium">Предизвикателства</div>
              <div class="text-gray-200">${person1Desc.challenges}</div>
            </div>
            <div>
              <div class="text-violet-400 font-medium">Професии</div>
              <div class="text-gray-200">${person1Desc.professions}</div>
            </div>
          </div>
        </div>

        <!-- Person 2 Details -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 space-y-4">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <h3 class="text-lg font-semibold">${person2.name}</h3>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Съдбовно число:</span>
              <span class="w-8 h-8 flex items-center justify-center bg-violet-600 text-white rounded-full font-bold">
                ${person2.soulNumber}
              </span>
            </div>
          </div>
          <div class="space-y-3">
            <div>
              <div class="text-violet-400 font-medium">Характер</div>
              <div class="text-gray-200">${person2Desc.character}</div>
            </div>
            <div>
              <div class="text-violet-400 font-medium">Силни страни</div>
              <div class="text-gray-200">${person2Desc.strengths}</div>
            </div>
            <div>
              <div class="text-violet-400 font-medium">Предизвикателства</div>
              <div class="text-gray-200">${person2Desc.challenges}</div>
            </div>
            <div>
              <div class="text-violet-400 font-medium">Професии</div>
              <div class="text-gray-200">${person2Desc.professions}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Trigger animations after a short delay
  setTimeout(() => {
    const compatScore = document.getElementById("compatScore");
    const compatBar = document.getElementById("compatBar");
    const compatDetails = document.getElementById("compatDetails");

    compatScore.classList.remove("opacity-0");
    compatBar.style.width = `${compatibility.score}%`;
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
