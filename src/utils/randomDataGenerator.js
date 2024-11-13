export function getRandomName() {
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

export function getRandomDate() {
  const day = Math.floor(Math.random() * 31) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  const currentYear = new Date().getFullYear();
  const year = Math.floor(Math.random() * (currentYear - 1900 + 1)) + 1900;
  return { day, month, year };
}
