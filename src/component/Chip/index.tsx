import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { ChipProps, ChipVariant } from "../../modal/component/Chip";

const getVariantColors = (variant: ChipVariant): { bg: string; fg: string } => {
  switch (variant) {
    case "success":
      return { bg: "#12B76A", fg: "#FFFFFF" };
    case "warning":
      return { bg: "#FB8C00", fg: "#FFFFFF" };
    case "error":
      return { bg: "#E53935", fg: "#FFFFFF" };
    case "info":
      return { bg: "#777783ff", fg: "#FFFFFF" };
    case "default":
    default:
      return { bg: "#E5E7EB", fg: "#111827" };
  }
};

export const Chip: React.FC<ChipProps> = ({ label, variant = "default", color, textColor, style: styleOverride, textStyle: textStyleOverride }) => {
  const { bg, fg } = getVariantColors(variant);
  const backgroundColor = color ?? bg;
  const colorText = textColor ?? fg;
  return (
    <View style={[styles.container, { backgroundColor }, styleOverride]}>
      <Text style={[styles.text, { color: colorText }, textStyleOverride]}>{label}</Text>
    </View>
  );
};
