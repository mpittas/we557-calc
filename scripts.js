// Translations
const translations = {
    en: {
      title: "Soul Number Calculator",
      enterFirstName: "Enter first name",
      enterSecondName: "Enter second name",
      birthDay: "Birth day (1-31)",
      birthMonth: "Birth month (1-12)",
      birthYear: "Birth year (e.g., 1990)",
      calculate: "Calculate",
      soulNumber: "Soul Number",
      calculation: "Calculation",
      compatibility: "Soul Number Compatibility",
      compatibilityFor: "Compatibility for",
      and: "and",
      invalidDate: "Please enter valid birth date values",
      enterName: "Please enter a name",
      numberMeanings: {
        5: "Loves freedom and variety, seeks new experiences, and is communicative. People with soul number 5 are adventurous, versatile, and value independence.",
        11: "A master number that represents intuition, spirituality, and deep connection. People with soul number 11 are highly spiritual, intuitive, and seek profound meaning in relationships.",
        1: "Natural born leader, independent, ambitious, and creative",
        2: "Diplomatic, cooperative, sensitive, and peaceful",
        3: "Expressive, creative, social, and optimistic",
        4: "Practical, organized, stable, and hardworking",
        6: "Nurturing, responsible, caring, and harmonious",
        7: "Analytical, introspective, spiritual, and philosophical",
        8: "Ambitious, successful, material-focused, and powerful",
        9: "Humanitarian, compassionate, selfless, and wise",
        22: "Master builder, practical visionary, powerful achiever",
      },
      compatibility511:
        "This is an interesting combination where freedom-loving 5 meets spiritual 11. While 5 brings adventure and communication, 11 adds depth and intuition to the relationship. Together, they can create a dynamic partnership that balances earthly experiences with spiritual growth.",
      defaultCompatibility:
        "These soul numbers create a unique blend of energies, each bringing their special qualities to the relationship.",
    },
    bg: {
      title: "Калкулатор на Душевно Число",
      enterFirstName: "Въведете първо име",
      enterSecondName: "Въведете второ име",
      birthDay: "Ден на раждане (1-31)",
      birthMonth: "Месец на раждане (1-12)",
      birthYear: "Година на раждане (напр. 1990)",
      calculate: "Изчисли",
      soulNumber: "Душевно число",
      calculation: "Изчисление",
      compatibility: "Съвместимост на Душевните Числа",
      compatibilityFor: "Съвместимост между",
      and: "и",
      invalidDate: "Моля, въведете валидни дати",
      enterName: "Моля, въведете име",
      numberMeanings: {
        5: "Обича свободата и разнообразието, търси нови преживявания и е комуникативен. Хората с душевно число 5 са авантюристични, гъвкави и ценят независимостта.",
        11: "Майсторско число, което представлява интуиция, духовност и дълбока връзка. Хората с душевно число 11 са силно духовни, интуитивни и търсят дълбок смисъл във взаимоотношенията.",
        1: "Естествен лидер, независим, амбициозен и креативен",
        2: "Дипломатичен, кооперативен, чувствителен и миролюбив",
        3: "Изразителен, креативен, социален и оптимистичен",
        4: "Практичен, организиран, стабилен и трудолюбив",
        6: "Грижовен, отговорен, загрижен и хармоничен",
        7: "Аналитичен, интроспективен, духовен и философски настроен",
        8: "Амбициозен, успешен, материално ориентиран и влиятелен",
        9: "Хуманитарен, състрадателен, безкористен и мъдър",
        22: "Майстор строител, практичен визионер, мощен постигащ",
      },
      compatibility511:
        "Това е интересна комбинация, където обичащата свободата 5 среща духовната 11. Докато 5 носи приключения и комуникация, 11 добавя дълбочина и интуиция към връзката. Заедно те могат да създадат динамично партньорство, което балансира земните преживявания с духовния растеж.",
      defaultCompatibility:
        "Тези душевни числа създават уникална смесица от енергии, като всяко внася своите специални качества във връзката.",
    },
  };
  
  // Global variables
  let currentLang = "en";
  
  // Utility functions
  function calculateInitialSum(day, month, year) {
    const dateString = `${day}${month}${year}`;
    return dateString.split("").reduce((a, b) => a + parseInt(b), 0);
  }
  
  function calculateSoulNumber(num) {
    if (num <= 12) return num;
    if (num === 22) return 22;
    return String(num)
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  
  function formatCalculation(dateString, initialSum, soulNumber) {
    return `${dateString.split("").join(" + ")} = ${initialSum}${
      initialSum > 12
        ? ` → ${initialSum.toString().split("").join(" + ")} = ${soulNumber}`
        : ""
    }`;
  }
  
  function validateBirthDate(day, month, year) {
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
  
  function getCompatibilityMessage(num1, num2) {
    if ((num1 === 5 && num2 === 11) || (num1 === 11 && num2 === 5)) {
      return translations[currentLang].compatibility511;
    }
    return translations[currentLang].defaultCompatibility;
  }
  
  function updateLanguage(lang) {
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
  
  function calculatePersonSoulNumber(personNum) {
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
  
  function updateCompatibility() {
    const result1 = document.getElementById("result1");
    const result2 = document.getElementById("result2");
    const compatibilityDiv = document.getElementById("compatibility");
  
    if (!result1.innerHTML || !result2.innerHTML) return;
  
    const number1 = result1.querySelector(".soul-number").textContent;
    const number2 = result2.querySelector(".soul-number").textContent;
    const name1 = result1.querySelector("h3").textContent.split("'")[0];
    const name2 = result2.querySelector("h3").textContent.split("'")[0];
  
    compatibilityDiv.innerHTML = `
          <h3>${translations[currentLang].compatibility}</h3>
          <p>${
            translations[currentLang].compatibilityFor
          } ${name1} (${number1}) ${
      translations[currentLang].and
    } ${name2} (${number2}):</p>
          <p>${getCompatibilityMessage(parseInt(number1), parseInt(number2))}</p>
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
    document
      .getElementById("langSwitch")
      .addEventListener("change", (e) => updateLanguage(e.target.value));
  });
  