import { t } from "i18next";

export function getWeekday(num) {
  switch (num) {
    case 1:
      return t("Monday");
    case 2:
      return t("Tuesday");
    case 3:
      return t("Wednesday");
    case 4:
      return t("Thursday");
    case 5:
      return t("Friday");
    case 6:
      return t("Saturday");
    case 0:
      return t("Sunday");
    default:
      return;
  }
}
