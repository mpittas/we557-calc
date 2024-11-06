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
  let monthSumDigits = dateMonthSum
    .toString()
    .split("")
    .reduce((a, b) => a + parseInt(b), 0);
  let dateMonthCalculation = `${day} + ${month} = ${dateMonthSum}`;
  if (dateMonthSum > 9) {
    dateMonthCalculation += ` → ${dateMonthSum
      .toString()
      .split("")
      .join(" + ")} = ${monthSumDigits}`;
  }

  resultDiv.innerHTML = `
    <h3 class="text-xl font-semibold mb-2">${name}'s ${
    translations[currentLang].soulNumber
  }</h3>
    
    <div class="calculation-group">
      <p class="font-semibold mb-2">${
        translations[currentLang].calculation
      }:</p>
      
      <div class="calculation">
        <p class="calculation-title">Съдбовно число:</p>
        <p>${formatCalculation(dateString, initialSum, soulNumber)}</p>
        <p class="result">Резултат: ${soulNumber}</p>
      </div>

      <div class="calculation">
        <p class="calculation-title">Число на душата</p>
        <p>${dateOfBirthCalculation}</p>
        <p class="result">Резултат: ${dateOfBirthNumber}</p>
      </div>

      <div class="calculation">
        <p class="calculation-title">Сума от дата и месец:</p>
        <p>${dateMonthCalculation}</p>
        <p class="result">Резултат: ${monthSumDigits}</p>
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
    result1.querySelector(".result").textContent.split(": ")[1]
  );
  const soulNumber2 = parseInt(
    result2.querySelector(".result").textContent.split(": ")[1]
  );

  // Get birth date numbers (from the second calculation)
  const birthNumber1 = parseInt(
    result1.querySelectorAll(".result")[1].textContent.split(": ")[1]
  );
  const birthNumber2 = parseInt(
    result2.querySelectorAll(".result")[1].textContent.split(": ")[1]
  );

  // Get date-month sum numbers (from the third calculation)
  const dateMonthNumber1 = parseInt(
    result1.querySelectorAll(".result")[2].textContent.split(": ")[1]
  );
  const dateMonthNumber2 = parseInt(
    result2.querySelectorAll(".result")[2].textContent.split(": ")[1]
  );

  const name1 = result1.querySelector("h3").textContent.split("'")[0];
  const name2 = result2.querySelector("h3").textContent.split("'")[0];

  compatibilityDiv.innerHTML = `
    <h3 class="compatibility-title">Съвместимост на числата</h3>
    
    <div class="compatibility-result mb-4">
      <h4 class="compatibility-subtitle">1. Съвместимост на Съдбовните Числа (${soulNumber1} и ${soulNumber2}):</h4>
      <div class="compatibility-details">
        <p>${name1}: ${getCompatibilityDescription(soulNumber1)}</p>
        <p>${name2}: ${getCompatibilityDescription(soulNumber2)}</p>
      </div>
      <p class="compatibility-message">${getCompatibilityMessage(
        soulNumber1,
        soulNumber2,
        translations,
        currentLang
      )}</p>
    </div>

    <div class="compatibility-result mb-4">
      <h4 class="compatibility-subtitle">2. Съвместимост на Числата от Дата на Раждане (${birthNumber1} и ${birthNumber2}):</h4>
      <div class="compatibility-details">
        <p>${name1}: ${getCompatibilityDescription(birthNumber1)}</p>
        <p>${name2}: ${getCompatibilityDescription(birthNumber2)}</p>
      </div>
      <p class="compatibility-message">${getCompatibilityMessage(
        birthNumber1,
        birthNumber2,
        translations,
        currentLang
      )}</p>
    </div>

    <div class="compatibility-result mb-4">
      <h4 class="compatibility-subtitle">3. Съвместимост на Сумите от Дата и Месец (${dateMonthNumber1} и ${dateMonthNumber2}):</h4>
      <div class="compatibility-details">
        <p>${name1}: ${getCompatibilityDescription(dateMonthNumber1)}</p>
        <p>${name2}: ${getCompatibilityDescription(dateMonthNumber2)}</p>
      </div>
      <p class="compatibility-message">${getCompatibilityMessage(
        dateMonthNumber1,
        dateMonthNumber2,
        translations,
        currentLang
      )}</p>
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
