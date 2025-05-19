import { generateCalendarDays } from "@/utils/calendar";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";

const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const calendarDays = generateCalendarDays(currentMonth, selectedDate);

  return {
    calendarDays,
    currentMonth,
    selectedDate,
    setSelectedDate,
    previousMonth,
    nextMonth,
  };
};

export default useCalendar;
