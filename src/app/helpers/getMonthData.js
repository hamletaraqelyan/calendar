export const getMonthData = (
  lang = "ru",
  monthName = new Date().toLocaleString("default", { month: "long" })
) => {
  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  // Validate month name
  if (!months.hasOwnProperty(monthName.toLowerCase())) {
    throw new Error("Invalid month name");
  }

  const currentYear = new Date().getFullYear();
  const monthIndex = months[monthName.toLowerCase()];
  const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
  const weekdays = {
    en: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    ru: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  };

  // Validate language
  if (!weekdays.hasOwnProperty(lang.toLowerCase())) {
    throw new Error("Invalid language");
  }

  const monthData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, monthIndex, day);
    const weekday = weekdays[lang.toLowerCase()][date.getDay()];
    const monthNameLocalized = date
      .toLocaleString(lang.toLowerCase(), { month: "long" })
      .toLowerCase();

    monthData.push({
      weekday: weekday,
      monthday: day,
      monthname: monthNameLocalized,
      value: 0,
    });
  }

  return monthData;
};
