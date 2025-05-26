import Calendar from "@/components/Calendar";
import { usePanel } from "@/hooks/usePanel";
import { useCalendarContext } from "@/providers/useCalendar";
import { useRef } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const CalendarScreen = () => {
  const calendarRef = useRef<Animated.View>(null);
  const { handleModeChange } = useCalendarContext();

  const { panelAnimatedStyle, panelGesture } = usePanel({
    calendarRef,
    onModeChange: handleModeChange,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-5">
        <Calendar ref={calendarRef} />
      </View>

      <View className="absolute bottom-0 w-full border-t border-gray-200">
        <Animated.View style={[panelAnimatedStyle]} className="w-full bg-white">
          <GestureDetector gesture={panelGesture}>
            <View className="items-center py-4">
              <View className="w-10 h-1 bg-gray-300 rounded-full" />
            </View>
          </GestureDetector>

          <View className="items-center flex-1 px-4">
            <Text className="mt-2 text-lg text-gray-500">추가 버튼을 눌러</Text>
            <Text className="text-lg text-gray-500">식단을 기록해주세요</Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
