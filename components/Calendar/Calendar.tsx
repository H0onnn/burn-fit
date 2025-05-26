import { COLORS } from "@/constants/Colors";
import { useCalendarSwipe } from "@/hooks/useCalendarSwipe";
import { useCalendarContext } from "@/providers/useCalendar";
import { formatMonthYear, getWeekdayNames } from "@/utils/calendar";
import { FontAwesome5 } from "@expo/vector-icons";
import { RefObject } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

type CalendarProps = {
  ref: RefObject<Animated.View | null>;
};

const Calendar = ({ ref }: CalendarProps) => {
  const {
    mode,
    calendarDays,
    currentMonth,
    currentWeek,
    setSelectedDate,
    previousMonth,
    nextMonth,
    previousWeek,
    nextWeek,
  } = useCalendarContext();

  const { animatedStyle, swipeGesture } = useCalendarSwipe({
    onPrevious: mode === "week" ? previousWeek : previousMonth,
    onNext: mode === "week" ? nextWeek : nextMonth,
  });

  const weekdayNames = getWeekdayNames();

  const getWeekDays = () => {
    const weekStart = currentWeek.startOf("week");

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const targetDate = weekStart.add(i, "day");

      const dayObj = calendarDays.find((day) =>
        day.date.isSame(targetDate, "day")
      );

      if (dayObj) {
        weekDays.push(dayObj);
      }
    }

    return weekDays;
  };

  const visibleDays = mode === "week" ? getWeekDays() : calendarDays;

  return (
    <View ref={ref}>
      <View className="flex-row items-center justify-between px-5 mb-4">
        <TouchableOpacity
          onPress={mode === "week" ? previousWeek : previousMonth}
        >
          <FontAwesome5 name="chevron-left" size={18} color={COLORS.primary} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-800">
          {formatMonthYear(currentMonth)}
        </Text>

        <TouchableOpacity onPress={mode === "week" ? nextWeek : nextMonth}>
          <FontAwesome5 name="chevron-right" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-2">
        {weekdayNames.map((day, index) => (
          <View key={index} className="items-center flex-1">
            <Text
              className={`${
                index === 0
                  ? "text-red"
                  : index === 6
                  ? "text-primary"
                  : "text-gray-400"
              }`}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[animatedStyle]} className="flex-row flex-wrap">
          {visibleDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              className="w-[14.28%] aspect-square items-center justify-center"
              onPress={() => setSelectedDate(day.date)}
              disabled={!day.isCurrentMonth}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center
                      ${day.isSelected && "border-primary border"}
                    `}
              >
                <Text
                  className={`${
                    !day.isCurrentMonth
                      ? "text-gray-400"
                      : day.isToday
                      ? "font-bold text-black"
                      : "text-black"
                  }`}
                >
                  {day.day}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Calendar;
