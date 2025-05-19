import { COLORS } from "@/constants/Colors";
import { useCalendar } from "@/hooks";
import { formatMonthYear, getWeekdayNames } from "@/utils/calendar";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Calendar = () => {
  const {
    calendarDays,
    currentMonth,
    setSelectedDate,
    previousMonth,
    nextMonth,
  } = useCalendar();

  const weekdayNames = getWeekdayNames();

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <ScrollView>
        <View>
          <View className="flex-row justify-between items-center mb-4 px-5">
            <TouchableOpacity onPress={previousMonth}>
              <FontAwesome5
                name="chevron-left"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <Text className="text-lg font-semibold text-gray-800">
              {formatMonthYear(currentMonth)}
            </Text>

            <TouchableOpacity onPress={nextMonth}>
              <FontAwesome5
                name="chevron-right"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row mb-2">
            {weekdayNames.map((day, index) => (
              <View key={index} className="flex-1 items-center">
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

          <View className="flex-row flex-wrap">
            {calendarDays.map((day, index) => (
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;
