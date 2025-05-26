import { generateCalendarDays, type CalendarDay } from "@/utils/calendar";
import dayjs, { Dayjs } from "dayjs";
import { createContext, useContext, useState } from "react";

interface CalendarState {
  mode: "month" | "week";
  handleModeChange: (mode: "month" | "week") => void;
  selectedDate: Dayjs;
  currentMonth: Dayjs;
  currentWeek: Dayjs;
  calendarDays: CalendarDay[];
  setSelectedDate: (date: Dayjs) => void;
  previousMonth: () => void;
  nextMonth: () => void;
  previousWeek: () => void;
  nextWeek: () => void;
}

const initialState: CalendarState = {
  mode: "month",
  handleModeChange: () => {},
  selectedDate: dayjs(),
  currentMonth: dayjs(),
  currentWeek: dayjs(),
  calendarDays: [],
  setSelectedDate: () => {},
  previousMonth: () => {},
  nextMonth: () => {},
  previousWeek: () => {},
  nextWeek: () => {},
};

const CalendarContext = createContext<CalendarState>(initialState);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("Provider가 필요합니다");
  }
  return context;
};

const useCalendarState = (): CalendarState => {
  const [mode, setMode] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [currentWeek, setCurrentWeek] = useState<Dayjs>(dayjs());

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const previousWeek = () => {
    const newWeek = currentWeek.subtract(1, "week");
    setCurrentWeek(newWeek);

    if (newWeek.month() !== currentMonth.month()) {
      setCurrentMonth(newWeek);
    }
  };

  const nextWeek = () => {
    const newWeek = currentWeek.add(1, "week");
    setCurrentWeek(newWeek);

    if (newWeek.month() !== currentMonth.month()) {
      setCurrentMonth(newWeek);
    }
  };

  const handleDateSelection = (date: Dayjs) => {
    setSelectedDate(date);
    setCurrentWeek(date);

    if (date.month() !== currentMonth.month()) {
      setCurrentMonth(date);
    }
  };

  const handleModeChange = (newMode: "month" | "week") => {
    setMode(newMode);

    if (newMode === "week" && selectedDate.month() !== currentMonth.month()) {
      handleDateSelection(currentMonth.startOf("month"));
    }
  };

  const calendarDays = generateCalendarDays(currentMonth, selectedDate);

  return {
    mode,
    handleModeChange,
    selectedDate,
    currentMonth,
    currentWeek,
    calendarDays,
    setSelectedDate: handleDateSelection,
    previousMonth,
    nextMonth,
    previousWeek,
    nextWeek,
  };
};

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const calendar = useCalendarState();

  return (
    <CalendarContext.Provider value={calendar}>
      {children}
    </CalendarContext.Provider>
  );
};
