/**
 * Function takes a Date and a number of days to add/subtract from today's date
 * if you need to subtract days pass a negative number
 * example: -1 wil return yesterday's date while passing 1 will return tomorrow
 *
 * @example
 * import { stringDateByDays } from "../helpers/date";
 *
 * let checkOutString = stringDateByDays(today, 5);
 * console.log(checkOutString) // 2023-03-24
 *
 * let checkOutString = stringDateByDays();
 * console.log(checkOutString) // 2023-03-19
 */
export function stringDateByDays(date?: Date, days = 0) {
  const today = date || new Date();
  if (days === 0) {
    return today.toISOString().split("T")[0];
  } else {
    const newDate = new Date(today.setDate(today.getDate() + days));
    return newDate.toISOString().split("T")[0];
  }
}

/**
 * Function to validate whether the input string is valid date time format or not
 * @example
 * import { isValidDate } from "@helpers/date";
 * expect(isValidDate("2022-02-01")).toBe(true);
 */
/* eslint-disable */
export function isValidDate(date: any) {
  const pass = Date.parse(date) && typeof date === "string" ? true : false;
  return pass;
}
