const translations = {
  bg: {
    invalidDate: "Моля, въведете валидна дата.",
    enterName: "Моля, въведете име.",
    enterEmail: "Моля, въведете валиден имейл адрес.",
  },
};

const currentLang = "bg";

const displayOptions = {
  fatefulNumber: false, // Съдбовно число
  soulNumber: false, // Число на душата
  personalNumber: false, // Лично число
  heartDesireNumber: true, // Число на желанието на сърцето
};

const correctPassword = "ew557-calc"; // Change this to your desired password

function calculateInitialSum(day, month, year) {
  const dateString = `${day}${month}${year}`;
  return dateString.split("").reduce((a, b) => a + parseInt(b), 0);
}

function calculateSoulNumber(num) {
  if (num === 22) return 22;
  if (num <= 12) return num;

  const secondSum = String(num)
    .split("")
    .reduce((a, b) => a + parseInt(b), 0);

  if (secondSum > 12) {
    return String(secondSum)
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }

  return secondSum;
}

function formatCalculation(dateString, initialSum, soulNumber) {
  // First equation: showing all digits being added with actual sum
  const digits = dateString.split("");
  let runningSum = 0;
  const firstSteps = digits
    .map((digit, index) => {
      runningSum += parseInt(digit);
      if (index === digits.length - 1) {
        return `${digit} = ${runningSum}`;
      }
      return digit;
    })
    .join(" + ");

  // Second equation: if needed, show the actual addition of digits
  let secondEquation = "";
  if (runningSum > 12) {
    const initialSumDigits = runningSum.toString().split("");
    let secondRunningSum = 0;
    const secondSteps = initialSumDigits
      .map((digit, index) => {
        secondRunningSum += parseInt(digit);
        if (index === initialSumDigits.length - 1) {
          return `${digit} = ${secondRunningSum}`;
        }
        return digit;
      })
      .join(" + ");
    secondEquation = ` → ${secondSteps}`;

    // If we need a third reduction
    if (secondRunningSum > 12) {
      const secondSumDigits = secondRunningSum.toString().split("");
      let finalSum = 0;
      const finalSteps = secondSumDigits
        .map((digit, index) => {
          finalSum += parseInt(digit);
          if (index === secondSumDigits.length - 1) {
            return `${digit} = ${finalSum}`;
          }
          return digit;
        })
        .join(" + ");
      secondEquation += ` → ${finalSteps}`;
    }
  }

  return firstSteps + secondEquation;
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

const fatefulNumberDescs = {
  1: "Характер: Хората с това число са лидери по природа, независими и решителни. Те са уверени и обичат да започнат ови начинания. Тяхната целеустременост често ги води към успех.",
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
  3: "Характер: Стремеж към изразяване, творчество и радост. Хората с това число на душата обичат да се забавляват и да излъчват позитивност. Те имат нужда от признание за своя талант и често са енергнни, харизматични и обичат да вдъхновяват.",
  4: "Характер: Желание за сигурност, стабилност и ред. Те обичат да планират и да изграждат сигурни основи. Хората с душевно число 4 са дисциплинирани, практични и търсят спокойствие в живота си.",
  5: "Характер: Желание за свобода, разнообразие и приключения. Тези хора имат неспокойна природа и жажда за нови преживявания. Те обичат промените и не се страхуват да поемат рискове, стига това да обогати опита им.",
  6: "Характер: Стремеж към грижа, подкрепа и хармония в семейството и отношенията. Хората с това число обичат да помагат на другите и да създават мир около себе си. Те са много отговорни и се стремят към баланс и стабилност в дома.",
  7: "Характер: Желание за дълбоки познания, самоусъвършенстване и дуовност. Те са интровертни и търсят мъдрост и истина. Хората с това число често се интересуват от философия, наука или духовни практики и имат нужда от време за уединение.",
  8: "Характер: Желание за успех, власт и материална стабилност. Те имат силен стремеж към постигане на високи позиции и финансова сигурност. Хората с това число обичат да се чувстват влиятелни и уважавани.",
  9: "Характер: Желание за хуманитарност, състрадание и помощ към другите. Тези хора са идеалисти и често се стремят да направят света по-добро място. Те са алтруистични, жертвоготовни и имат желание да служат на обществото.",
};

const vowelNumberDescs = {
  1: "Желание на сърцето 1: Числото на желанието на сърцето 1 иска да води най-много от всичко и дори може да желае да поеме контрол над другите около себе си. Хората с желание на сърцето 1 не обичат да получават заповедите и да се подчиняват, те обикновено са твърдоглави, със силна воля, амбициозни и независими. Не е изненадващо, че хората с желание на сърцето 1 стоят далеч от екипи, комитети - и също така от скромността.\n В сърдечните връзки те са романтици - особено когато обектът на чувствата им отговори на техните очаквания. Тези хора очакват от партньорите си да бъдат очарователни, умнни, независими като тях, затова невинаги имат желание да покажат своята романтична природа. Дори понякога изглеждат студени и отчуждени - но го правят само за да се защитят. Не е необичайно хората с желание на сърцето 1 да търсят самотни занимания, често предпочитат да работят сами вместо да страдат, че някой ги прави глупаци.",

  2: "Желание на сърцето 2: Най-съкровеното желание на 2 е хармонията на всяка цена. Хората с желание на сърцето 2 не обичат конфликтите, нито пък да бъдат водачи - желаят мир и да подкрепят. Числото на желанието на сърцето 2 има уникалната способност да вижда и двете страни в дадена ситуация. Затова не е изненадващо да ги видим като посредници и арбитри. В крайна сметка, те са изключително чувствителни спрямо другите и умеят да ги накарат да се почувстват добре. Тактични са и умея да поднасят истинат по такъв начин, че другите да се почувстват подкрепени, а не обвинявани.\n Хората с желание на сърцето 2 излъчват топлина и любов и могат да играят подкрепяща роля в двойка с всяко друго число.\nВ сърдечните дела те са най-добри в даването и могат да увлекат до такава степен, че да забравят за себе си. Ако другите ги оценяват, те се чувстват на върха на щастието, когато критиката ги поразява право в сърцето. Винаги по-щастливи са в двойка, отколкото сами, и никой не е по-отдаден пратьор от човека с желание на сърцето 2.",

  3: "Желание на сърцето 3: Желание на сърцето 3 е да прави другите щастливи, да се смее, да вдъхва ентусиазъм и да окуражава другите да дават най-доброто от себе си. желанието на сърцето 3 обича живота! Хората с желание на сърцето 3 обичат да използват творческите си таланти, независимо дали пишат, рисуват, танцуват, декорират или пеят за това, което сърцето им желае.\n В сърдечните дела хората с желание на сърцето 3 обичат флирта. Те често променят решението си, но не ги наричайте непостоянни - с желание на сърцето 3 те обичат да се забавляват. Често можете да видите тези хора да крачат бързо и леко, подтиквани от своя ентусиазъм. Повярвайте ни, човек с желание на сърцето 3 ще събуе чорапите ви романтично.",

  4: "Желание на сърцето 4: В сърцето на всеки човек с желание на сърцето 4 е желанието да има план, да живее живота си организирано и да бъде практичен във всичко, което прави. Човекът с желание на сърцето 4 обича своето тефтерче, където са отбелязани срещите му, дневния ред, поставянето на ясни граници и да е наясно какво да очаква от всички, свързани с него. Също така обича да знае какъв е планът и да го държи под контрол, за да няма никакви изненади. Трябва да се каже, че хората с желание на сърцето 4 умеят да улесняват нещата на всички, те умеят да обединяват другите и така общата им енергия може да сътвори чудеса.\n В сърдечните дела хората с желание на сърцето 4 са практични в емоционалните връзки и също така и тук искат да държат всичко под контрол. Те не изглеждат романтични, предпочитат да поднасят и получават практични подаръци, да планират предварително вечерята, на която ще поканят любимия или любимата, при това съвършено прецизно - в резултат всичко се получава невероятно романтично, вълнуващо и прекрасно.",

  5: "Желание на сърцето 5: Първо и преди всичко в сърцето на човека с желание на сърцето 5 е желанието да бъде свободен от ограничения, да следва страстта си за промяна и пътешествия. Хората с желание на сърцето 5 не понасят да се чувстват попаднали в капан или да бъдат потопени в монотонна рутина. Те обичат да опитват многообразието и стимулите, които животът може да им предложи.\n В сърдечните дела хората с желанието на сърцето 5 се движат от четири букви - СЕКС, като С е съблазън, Е е естраоринарност, К е красота, а С - Свобода. Склонни към бунтарство и чувствени към природа, хората с желание на сърцето 5 се управляват от сексуланите си желания в сърдечните работи (ако сексуалната им енергия не е потискана от другите числа или от обстоятелства). Петиците са авантюристи и готови да поемат рискове - освен ако не са потиснати. (Може би тантра е за тях?)",

  6: "Желание на сърцето 6: Трите най-скъпи неща за човека с желание на сърцето 6 са красотата, хармонията и домът. Разбиращи, верни, отдадени, нежни и привързани, те едва ли ще ви предадат, тук няма да намерите никакви петици. Хората с желание на сърцето 6 желаят да подкрепят, да подхранват и да обичат своите семейства и домове.\n В сърдечните дела те са идеалисти и романтици - задължителни за розите и свещите. С желание на сърцето 6 любовта е дълбока и от типа на обричане за цял живот. Това число на желанието на сърцето желае брак и семейство и да има дом, който да разхубавява. Дори не си мислете само да се забавлявате с такъв човек - или предложете брак, или го забравете.",

  7: "Желание на сърцето 7: Тези емоционални аскети рядко показват чувствата си. Много от тя така и не се женят, тъй като предпочитат своите мли и собствената си компания пред общуването с другите. Хората с желание на сърцето 7 лесно биха могли да станат свещеници, монахини и монаси или водачи в пустинни местности, тъй като обичат самотата. Пребиваването в тишина, спокойствие и мир е прелъстително и близко за душата на 7. Хората с желание на сърцето 7 наистина обичат да остават сами - и да четат.\n В сърдечните дела, ако човек с желание на сърцето 7 се реши да има партньор, очаквайте това да бъде тайна и пазена от чужди очи връзка. Дори можете да се обзаложите, че и избраникът ще е също с желание на сърцето 7. Мислите на хората с желание на сърцето 7 се пазят в тайна, също както и техния необичаен (можем ли да кажем ексцентричен?) начин на живот. Това са много чувствителни души, които с потребността си да разсъждават и анализират често придобиват психична сила и високоразвити умения за възприемане. Не се опитвайте да мамите човек със 7 относно чувствата си - той или тя може да ги долови от километър.",

  8: "Желание на сърцето 8: Това число иска да е шефът или поне да има някаква власт за нещо. Трудно е за хората с желание на сърцето 8 да разбират чувствата на другите и те предпочитат да се насочват към бизнеса вместо да се забъркват в емоционални връзки. В най-съкровеното кътче на сърцето си желаят да се чувстват важни - не само вкъщи, но и още по-важно, в това, в което са постигнали в света.\n Ако имате връзка с човек с желание на сърцето 8, не си представяйте романтичен обяд насаме в закътан ъгъл в малко ресторантче. Много често или винаги подобен обяд ще бъде прекъснат от звънене на служебния телефон, а човекът с 8 ще отговори, и най-близкото до интимен разговор е подробното обясняване на последната транзакция. Човекът с това число се оглежда за силен, способен (и да, по-добре е да се организирате) партньор, който има същите амбиции. В редки моменти можете да се радвате на топлотата и любовта на 8 - това става, когато тези хора свалят защитата си, - но през повечето време те са просто твърде заети за романтика.",

  9: "Желание на сърцето 9: Това е самата душа на състраданието. В най-съкровеното кътче на сърцето си хората с желание на сърцето 9 желаят да обичат света и всичко в него, със своите високи идеали и сила да влияят на другите те жадуват за всемирно съвършенство и всемирна любов. Силно интуитивни и милостиви, хората с желание на сърцето 9 често са разкъсвани от собственика си емоционални потребности и по-важните според тях потребности на другите.\n В сърдечните дела хората с желание на сърцето 9 са любящите, идеалисти и романтични. Дори можем да се обзаложим, че вероятно те от всички числа най-рано започват да търсят сродната си душа. Огромната любов на човек с желание на сърцето 9 изглежда безгранична - и тя наистина е.",

  11: "Желание на сърцето 11: Царското число 11 е на изключително чувствителна душа, на границата със способностите на медиум. Хората с царското число на желанието 11 имат повече и по-силни върхове и спадове от другите числа (не е чудно, те се стремят да уравновесят цялата тази информация, която долавят като медиуми). В добавка те са мъдри не според годините си, разбират и виждат много повече неща от обикновените хора. Съкровеното им желание е да носят мир навсякъде - в партньорски връзки и съдружия, в любовта, в семейството, в съседски общности, сред различни етнически групи. Хората с желание на сърцето 11 имат големи идеи и най-често те доказват правотата си. Това число е на стара душа, на душа, която носи древно познание и духовна мъдрост във всичко, с което влиза в досег. Може би познавате такъв човек - той е мъдрец независимо от възрастта си.\n В сърдечните дела, подобно на 2, човекът с желание на сърцето 11 може да е мил и нежен, и да обича да доставя удоволствие. Но бъдете нащрек за единиците - те са две, за да бъдем точни. Това число желае да бъде водач и не се съгласява да свири втора цигулка, въпреки че най-съкровеното му желание е хармонията. Това царско число ще внася духовност във всяка връзка, тъй като познава нещата - познава другите светове и неща, които са извън нашата способност да си ги представим.",

  22: "Желание на сърцето 22: В сърцето си царското число 22 желае да изгради нещо голямо за благото на човечеството, което ще остане дълго след него. Тези души са способни да допринесат за осъществяването на велики реформи, които същевременно носят разбиране на духовността чрез своето лидерство. Това царско число принадлежи на футурист, който ще напусне тази земя, след като е постигнал истинска материална сигурност.\n В сърдечните дела тази душа е солидна като 4, тя търси партньор, който е практичен, има ясни цели и е надежден. Човек с желание на сърцето 22 желае да сподели любовта си с избраник, с когото може да превърне мечтите си в реалност.",

  33: "Желание на сърцето 33: Царското число 33 като желание на сърцето дава стремеж да се раздава на всички, изпаднали в нужда. С радостно сърце, любещ и енергичен, човекът с това число докосва сърцата на всички, които го молят за закрила, грижа и помощ, и това число на желанието на сърцето помага на човека да израсне във вибрацията на любовта до най-високото й ниво - състрадание към всички.\n Царското число 33 е число и на саможертва, но също на силната лечителска енергия. Ако има невероятния късмет да сте във връзка с 33, знайте, че след всяка емоционална драма ще ви облее любовта, която лекува сърцето -  а това е съкровеното желание на 33.",
};

function calculateVowelNumber(name) {
  const vowelValues = {
    А: 1,
    а: 1,
    Е: 6,
    е: 6,
    И: 9,
    и: 9,
    О: 6,
    о: 6,
    У: 2,
    у: 2,
    Ъ: 9,
    ъ: 9,
  };

  const vowels = name.split("").filter((char) => vowelValues[char]);
  const calculation = vowels.map((v) => `${v}(${vowelValues[v]})`).join(" + ");
  const sum = vowels.reduce((acc, char) => acc + (vowelValues[char] || 0), 0);

  // Special cases for master numbers
  if (sum === 22 || sum === 33) {
    return {
      number: sum,
      calculation: `Намерени гласни: ${vowels.join(
        ", "
      )}\nИзчисление: ${calculation} = ${sum}`,
      vowels: vowels.join(", "),
    };
  }

  // Special case for 10
  if (sum === 10) {
    return {
      number: 1, // Reduced to 1
      calculation: `Намерени гласни: ${vowels.join(
        ", "
      )}\nИзчисление: ${calculation} = ${sum}\nРедукция: 1 + 0 = 1`,
      vowels: vowels.join(", "),
    };
  }

  // Reduce if greater than 11 and not 22 or 33
  if (sum > 11 && sum !== 22 && sum !== 33) {
    const reducedSum = String(sum)
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
    return {
      number: reducedSum,
      calculation: `Намерени гласни: ${vowels.join(
        ", "
      )}\nИзчисление: ${calculation} = ${sum}\nРедукция: ${sum} → ${sum
        .toString()
        .split("")
        .join(" + ")} = ${reducedSum}`,
      vowels: vowels.join(", "),
    };
  }

  return {
    number: sum,
    calculation: `Намерени гласни: ${vowels.join(
      ", "
    )}\nИзчисление: ${calculation} = ${sum}`,
    vowels: vowels.join(", "),
  };
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

  // Add after the existing calculations but before creating the HTML
  const vowelResult = calculateVowelNumber(name);
  const vowelNumberDescription =
    vowelNumberDescs[vowelResult.number] || "Описание не е налично.";

  resultDiv.innerHTML = `
    <div>
      <div class="flex items-center justify-between pb-4">
        <h3 class="text-2xl font-bold text-gray-100">${name}</h3>
      </div>
      
      <div class="space-y-6">
        <!-- First Calculation -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 ${
          displayOptions.fatefulNumber ? "" : "hidden"
        }">
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
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 ${
          displayOptions.soulNumber ? "" : "hidden"
        }">
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
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 ${
          displayOptions.personalNumber ? "" : "hidden"
        }">
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

        <!-- Fourth Calculation (Heart Desire Number) -->
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 ${
          displayOptions.heartDesireNumber ? "" : "hidden"
        }">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 flex items-center justify-center bg-violet-600 text-white text-sm rounded-full font-bold">
                ${vowelResult.number}
              </div>
              <h4 class="text-lg font-semibold text-gray-100">Число на желанието на сърцето</h4>
              <div class="group relative">
                <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                <div class="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                  Сборът от числовите стойности на гласните в името
                </div>
              </div>
            </div>
          </div>
          <div class="font-mono bg-black/20 p-4 rounded-lg text-gray-100 whitespace-pre-line">${
            vowelResult.calculation
          }</div>
          <div class="mt-4 text-gray-100">
            ${vowelNumberDescription}
          </div>
        </div>
      </div>
    </div>
  `;

  // After displaying the results, check if the email checkbox is checked
  const emailCheckbox = document.getElementById("emailResultsCheckbox");
  if (emailCheckbox.checked) {
    const emailInput = document.getElementById("emailInput");
    const emailAddress = emailInput.value.trim();

    if (!emailAddress) {
      alert(translations[currentLang].enterEmail);
      return;
    }

    // Get birth time if checkbox is checked
    const birthTimeCheckbox = document.getElementById("birthTimeCheckbox");
    let birthTimeInfo = "";
    if (birthTimeCheckbox.checked) {
      const birthTime = document.getElementById("birthTimeInput").value;
      if (birthTime) {
        birthTimeInfo = `\nЧас на раждане: ${birthTime}`;
      }
    }

    // Prepare the email content with optional birth time
    const emailContent = `
      Здравейте, ${name},

      Вашите резултати:${birthTimeInfo}

      Съдбовно число (${soulNumber}):
      ${fatefulNumberDescription}

      Число на душата (${dateOfBirthNumber}):
      ${soulNumberDescription}

      Лично число (${dateMonthSum}):
      ${personalNumberDescription}

      Число на желанието на сърцето (${vowelResult.number}):
      ${vowelNumberDescription}
    `;

    // Send the email using EmailJS
    emailjs
      .send("service_2ka3lwp", "template_yfvbfxa", {
        to_name: name,
        to_email: emailAddress,
        message: emailContent,
      })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Резултатите бяха изпратени на имейл адреса ви.");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Възникна грешка при изпращането на имейла.");
        }
      );
  }
}

// Initialize event listeners when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  document
    .getElementById("calculate1")
    .addEventListener("click", () => calculatePersonSoulNumber(1));

  // New code for handling the checkbox and email input field
  const emailCheckbox = document.getElementById("emailResultsCheckbox");
  const emailInputContainer = document.getElementById("emailInputContainer");

  emailCheckbox.addEventListener("change", function () {
    if (this.checked) {
      emailInputContainer.style.display = "block";
    } else {
      emailInputContainer.style.display = "none";
    }
  });

  // Add birth time checkbox handler
  const birthTimeCheckbox = document.getElementById("birthTimeCheckbox");
  const birthTimeContainer = document.getElementById("birthTimeContainer");

  birthTimeCheckbox.addEventListener("change", function () {
    if (this.checked) {
      birthTimeContainer.style.display = "block";
    } else {
      birthTimeContainer.style.display = "none";
    }
  });

  document.getElementById('loginButton').addEventListener('click', checkPassword);
  document.getElementById('passwordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });

  function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const loginOverlay = document.getElementById('loginOverlay');
    
    if (passwordInput.value === correctPassword) {
      loginOverlay.style.display = 'none';
      // Optional: Save to session storage so user doesn't need to login again if page refreshes
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Грешна парола!');
      passwordInput.value = '';
    }
  }

  // Check if user is already logged in
  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('loginOverlay').style.display = 'none';
  }
});
