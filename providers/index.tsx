import { type ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CalendarProvider } from "./useCalendar";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CalendarProvider>{children}</CalendarProvider>
    </GestureHandlerRootView>
  );
};
