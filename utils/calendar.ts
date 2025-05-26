import dayjs, { type Dayjs } from "dayjs";

export interface CalendarDay {
  date: Dayjs;
  day: number | string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export const generateCalendarDays = (
  currentMonth: Dayjs,
  selectedDate: Dayjs
): CalendarDay[] => {
  const year = currentMonth.year();
  const month = currentMonth.month();

  const firstDayOfMonth = dayjs(new Date(year, month, 1));
  const lastDayOfMonth = currentMonth.endOf("month");

  const daysInMonth = lastDayOfMonth.date();
  const firstDayWeekday = firstDayOfMonth.day(); // 0: 일요일 부터 시작

  const today = dayjs();
  const days: CalendarDay[] = [];

  // 이전 달
  for (let i = 0; i < firstDayWeekday; i++) {
    const prevMonthDate = firstDayOfMonth.subtract(firstDayWeekday - i, "day");
    days.push({
      date: prevMonthDate,
      day: prevMonthDate.date(),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    });
  }

  // 이번 달
  for (let i = 1; i <= daysInMonth; i++) {
    const date = dayjs(new Date(year, month, i));
    days.push({
      date,
      day: i,
      isCurrentMonth: true,
      isToday: date.isSame(today, "day"),
      isSelected: date.isSame(selectedDate, "day"),
    });
  }

  // 다음 달
  // 달력에 최대 5주 까지 표시 (7일 * 6주 = 42일 - 이번 달 일수 - 이번 달 시작 요일)
  for (let i = 1; i <= 42 - daysInMonth - firstDayWeekday; i++) {
    const nextMonthDate = lastDayOfMonth.add(i, "day");
    days.push({
      date: nextMonthDate,
      day: nextMonthDate.date(),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    });
  }

  return days;
};

export const formatMonthYear = (date: Dayjs): string => {
  return date.format("MMMM YYYY");
};

export const getWeekdayNames = (): string[] => {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
};
