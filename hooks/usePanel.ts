import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import type Animated from "react-native-reanimated";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface UsePanelProps {
  calendarRef: React.RefObject<Animated.View | null>;
  onModeChange: (mode: "month" | "week") => void;
}

export const usePanel = ({ calendarRef, onModeChange }: UsePanelProps) => {
  const { top } = useSafeAreaInsets();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const [calendarHeight, setCalendarHeight] = useState(0);
  const [minPanelHeight, setMinPanelHeight] = useState(0);
  const [maxPanelHeight, setMaxPanelHeight] = useState(0);

  const panelHeight = useSharedValue(0);
  const startY = useSharedValue(panelHeight.value);

  const panelAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: panelHeight.value,
    };
  });

  const panelGesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = panelHeight.value;
    })
    .onUpdate((event) => {
      const newHeight = startY.value - event.translationY;
      panelHeight.value = newHeight;
    })
    .onEnd(() => {
      const midpoint = (minPanelHeight + maxPanelHeight) / 2;
      if (panelHeight.value < midpoint) {
        panelHeight.value = withTiming(minPanelHeight, { duration: 250 });
        runOnJS(onModeChange)("month");
      } else {
        panelHeight.value = withTiming(maxPanelHeight, { duration: 250 });
        runOnJS(onModeChange)("week");
      }
    });

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.measure((_x, _y, _width, height) => {
        const newHeight = height + top;
        setCalendarHeight(newHeight);
      });
    }
  }, [calendarRef.current]);

  useEffect(() => {
    if (calendarHeight > 0) {
      const minHeight = SCREEN_HEIGHT - top - calendarHeight;
      panelHeight.value = withTiming(minHeight, { duration: 300 });
      setMinPanelHeight(minHeight);
      setMaxPanelHeight(SCREEN_HEIGHT - top - calendarHeight / 2);
    }
  }, [calendarHeight]);

  return {
    panelAnimatedStyle,
    panelGesture,
  };
};
