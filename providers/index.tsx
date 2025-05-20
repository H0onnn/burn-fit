import { type ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return <GestureHandlerRootView>{children}</GestureHandlerRootView>;
};
