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

export function calculateCompatibilityScore(num1, num2) {
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

  // ... render compatibility HTML
}
