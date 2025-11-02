import { TextStyle, ViewStyle } from "react-native";

export type ChipVariant = "default" | "success" | "warning" | "error" | "info";

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}