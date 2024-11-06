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
  const meaning = translations[currentLang].numberMeanings[soulNumber];

  resultDiv.innerHTML = `
              <h3>${name}'s ${translations[currentLang].soulNumber}</h3>
              <div class="soul-number">${soulNumber}</div>
              <p class="calculation">${
                translations[currentLang].calculation
              }: ${formatCalculation(dateString, initialSum, soulNumber)}</p>
              <p class="meaning">${meaning}</p>
          `;

  updateCompatibility();
}

export function updateCompatibility() {
  const result1 = document.getElementById("result1");
  const result2 = document.getElementById("result2");
  const compatibilityDiv = document.getElementById("compatibility");

  if (!result1.innerHTML || !result2.innerHTML) return;

  const number1 = parseInt(result1.querySelector(".soul-number").textContent);
  const number2 = parseInt(result2.querySelector(".soul-number").textContent);
  const name1 = result1.querySelector("h3").textContent.split("'")[0];
  const name2 = result2.querySelector("h3").textContent.split("'")[0];

  compatibilityDiv.innerHTML = `
              <h3>${translations[currentLang].compatibility}</h3>
              <p>${
                translations[currentLang].compatibilityFor
              } ${name1} (${number1}) ${
    translations[currentLang].and
  } ${name2} (${number2}):</p>
              <p>${getCompatibilityMessage(
                number1,
                number2,
                translations,
                currentLang
              )}</p>
          `;
}

// Initialize event listeners when the page loads
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("calculate1")
    .addEventListener("click", () => calculatePersonSoulNumber(1));
  document
    .getElementById("calculate2")
    .addEventListener("click", () => calculatePersonSoulNumber(2));
});
