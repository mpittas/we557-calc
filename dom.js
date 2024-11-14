import { translations } from "./translations.js";
import {
  calculateInitialSum,
  calculateSoulNumber,
  formatCalculation,
  validateBirthDate,
} from "./utils.js";
let currentLang = "bg";

const fatefulNumberDescs = {
  1: "Характер: Хората с това число са лидери по природа, независими и решителни. Те са уверени и обичат да започват нови начинания. Тяхната целеустременост често ги води към успех.",
  2: "Характер: Дипломатични, спокойни и хармонични, хората с число 2 са способни да изграждат добри отношения и често имат силна интуиция. Те ценят сътрудничеството и са добри слушатели.",
  3: "Характер: Креативни, общителни и вдъхновяващи, тези хора обичат да се изразяват и често са център на внимание. Имат дарба за комуникация и заразяват другите с позитивността си.",
  4: "Характер: Надеждни, трудолюбиви и практични, тези хора са силно организирани и ценят стабилността. Често се стремят към сигурност и предпочитат стабилни основи във всичко, което правят.",
  5: "Характер: Тези хора търсят свобода, обичат промените и имат силно желание за нови преживявания. Те са динамични, социални и нетърпеливи да опитват различни неща.",
  6: "Характер: Отговорни, грижовни и ориентирани към семейството, хората с това число обичат да помагат на другите. Те се стремят към хармония и често се ангажират с подкрепа на близките си.",
  7: "Характер: Интровертни, аналитични и духовно настроени, тези хора обичат да изследват дълбоки теми и да разсъждават. Те са мислители и често се стремят към самоусъвършенстване и мъдрост.",
  8: "Характер: Амбициозни и фокусирани върху успеха, хората с число 8 често се стремят към финансово благополучие и власт. Те са практични, стабилни и добри лидери с усет за бизнес.",
  9: "Характер: Алтруистични, идеалисти и ориентирани към световното добро, тези хора се стремят да помагат на другите и да подобрят света. Те са състрадателни и вдъхновяващи.",
  10: "Характер: Това число съчетава качествата на 1 и 0, придавайки както независимост, така и креативност. Хората с това число често са амбициозни, новатори и обичат да реализират оригинални идеи.",
  11: "Характер: Хората с това число са високо интуитивни, вдъхновяващи и често се разглеждат като духовни учители. Те притежават силна интуиция и могат да се чувстват призвани да водят другите с вдъхновение и мъдрост.",
  12: "Характер: Това число комбинира качествата на 1 и 2 – лидерство и дипломатичност. Хората с число 12 са социални, креативни и умеят да работят както самостоятелно, така и в екип. Те често вдъхновяват другите със своята харизма и стремеж към хармония.",
};

const personalNumberDescs = {
  1: "Характер: Лидери по природа, силни и независими, хората с Лично число 1 излъчват самоувереност и решителност. Те често са възприемани като смели и целеустремени и вдъхват респект и вдъхновение на околните. Обикновено имат силно желание за успех и обичат да бъдат първи в това, което правят.",
  2: "Характер: Личности, които излъчват мир, съчувствие и чувствителност. Те са дипломатични и ценят хармонията в отношенията. Хората ги възприемат като мили, търпеливи и разбиращи, а също така имат естествена способност да сътрудничат и да поддържат спокойствие в конфликтни ситуации.",
  3: "Характер: Творчески, общителни и енергични, хората с това число са магнетични и забавни. Те обичат да изразяват себе си и привличат другите със своята харизма и оптимизъм. Възприемат ги като интересни и забавни личности, които умеят да вдъхновяват.",
  4: "Характер: Надеждни, стабилни и трудолюбиви, хората с това число се възприемат като организирани и практични. Те излъчват сигурност и често са търсени за съвет или подкрепа. Хората ги виждат като сериозни и отговорни личности, на които може да се разчита.",
  5: "Характер: Свободолюбиви, енергични и общителни. Хората с Лично число 5 се възприемат като забавни и динамични личности, които обичат промените и приключенията. Те са изключително адаптивни и привличат другите със своята енергия и желание за нови преживявания.",
  6: "Характер: Грижовни, отговорни и семейно ориентирани. Те излъчват топлина и желание за подкрепа, и хората ги възприемат като стабилни и състрадателни личности. Те често са тези, които създават хармония в групи и се грижат за благополучието на другите.",
  7: "Характер: Интелектуални, мистериозни и интровертни. Хората с Лично число 7 се възприемат като дълбокомислещи и мъдри. Те често са вглъбени и изглеждат като хора, които търсят истината. Привличат другите с аналитичния си ум и философските си идеи.",
  8: "Характер: Амбициозни, решителни и уверени. Те излъчват авторитет и често са възприемани като силни и влиятелни личности. Хората с Лично число 8 имат усещане за власт и успех и обикновено се стремят към високи постижения и финансова стабилност.",
  9: "Характер: Алтруисти, състрадателни и ориентирани към помощ на другите. Те се възприемат като вдъхновяващи и хуманни личности, които се интересуват от глобалното добро. Тези хора често излъчват топлота и мъдрост и обичат да допринасят за благото на обществото.",
};

const soulNumberDescs = {
  1: "Характер: Желание за независимост, лидерство и себеизразяване. Хората с това число имат вътрешна амбиция и се стремят към постижения и признание. Те искат да бъдат забелязани и ценени за уникалността си и да бъдат вдъхновение за другите.",
  2: "Характер: Желание за хармония, мир и партньорство. Те търсят дълбоки емоционални връзки и обичат да се чувстват част от група. Тези хора са състрадателни и обичат да създават баланс в отношенията си.",
  3: "Характер: Стремеж към изразяване, творчество и радост. Хората с това число на душата обичат да се забавляват и да излъчват позитивност. Те имат нужда от признание за своя талант и често са енергични, харизматични и обичат да вдъхновяват.",
  4: "Характер: Желание за сигурност, стабилност и ред. Те обичат да планират и да изграждат сигурни основи. Хората с душевно число 4 са дисциплинирани, практични и търсят спокойствие в живота си.",
  5: "Характер: Желание за свобода, разнообразие и приключения. Тези хора имат неспокойна природа и жажда за нови преживявания. Те обичат промените и не се страхуват да поемат рискове, стига това да обогати опита им.",
  6: "Характер: Стремеж към грижа, подкрепа и хармония в семейството и отношенията. Хората с това число обичат да помагат на другите и да създават мир около себе си. Те са много отговорни и се стремят към баланс и стабилност в дома.",
  7: "Характер: Желание за дълбоки познания, самоусъвършенстване и духовност. Те са интровертни и търсят мъдрост и истина. Хората с това число често се интересуват от философия, наука или духовни практики и имат нужда от време за уединение.",
  8: "Характер: Желание за успех, власт и материална стабилност. Те имат силен стремеж към постигане на високи позиции и финансова сигурност. Хората с това число обичат да се чувстват влиятелни и уважавани.",
  9: "Характер: Желание за хуманитарност, състрадание и помощ към другите. Тези хора са идеалисти и често се стремят да направят света по-добро място. Те са алтруистични, жертвоготовни и имат желание да служат на обществото.",
};

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
  const fatefulNumberDescription =
    fatefulNumberDescs[soulNumber] || "Описание не е налично.";

  // Calculate date of birth number with detailed steps
  let dateOfBirthNumber = day;
  let dateOfBirthCalculation = "";

  // Always show the calculation, even for single digits
  if (day <= 9) {
    dateOfBirthCalculation = `${day} = ${day}`;
    dateOfBirthNumber = day;
  } else {
    const digits = day.toString().split("");
    let reducedSum = 0;
    dateOfBirthCalculation = digits
      .map((digit, index) => {
        reducedSum += parseInt(digit);
        if (index === digits.length - 1) {
          return `${digit} = ${reducedSum}`;
        }
        return digit;
      })
      .join(" + ");
    dateOfBirthNumber = reducedSum;

    // If still greater than 9, reduce again
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
      dateOfBirthCalculation += ` → ${finalSteps}`;
      dateOfBirthNumber = finalSum;
    }
  }

  const soulNumberDescription =
    soulNumberDescs[dateOfBirthNumber] || "Описание не е налично.";

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

  const personalNumberDescription =
    personalNumberDescs[dateMonthSum] || "Описание не е налично.";

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
          <div class="mt-4 text-gray-100">
            ${fatefulNumberDescription}
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
          <div class="mt-4 text-gray-100">
            ${soulNumberDescription}
          </div>
        </div>

        <!-- Third Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
                ${dateMonthSum}
              </div>
              <h4 class="text-lg font-semibold text-gray-100">Лично число</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Сборът от деня и месеца на раждане
                </div>
              </div>
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100">
            ${dateMonthCalculation}
          </div>
          <div class="mt-4 text-gray-100">
            ${personalNumberDescription}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize event listeners when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  // Prepopulate input fields with default values
  document.getElementById("name1").value = "Име"; // Default name
  document.getElementById("day1").value = "1"; // Default day
  document.getElementById("month1").value = "1"; // Default month
  document.getElementById("year1").value = "2000"; // Default year

  // Test DOM element access
  const elements = ["name1", "day1", "month1", "year1", "calculate1"];
  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Element with id '${id}' not found`);
    }
  });

  document
    .getElementById("calculate1")
    .addEventListener("click", () => calculatePersonSoulNumber(1));
});
