import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface UseCalendarSwipeProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const useCalendarSwipe = ({
  onPrevious,
  onNext,
}: UseCalendarSwipeProps) => {
  const translateX = useSharedValue(0);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 50) {
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
          translateX.value = -SCREEN_WIDTH;
          runOnJS(onPrevious)();
          translateX.value = withTiming(0, { duration: 200 });
        });
      } else if (event.translationX < -50) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
          translateX.value = SCREEN_WIDTH;
          runOnJS(onNext)();
          translateX.value = withTiming(0, { duration: 200 });
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  return {
    animatedStyle,
    swipeGesture,
  };
};
