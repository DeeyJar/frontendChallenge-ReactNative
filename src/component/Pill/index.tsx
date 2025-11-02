import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { PillProps, PillState } from "../../modal/component/Pill";

const getStateColors = (state?: PillState) => {
  switch (state) {
    case "success":
      return { bg: "#12B76A", fg: "#FFFFFF" };
    case "warning":
      return { bg: "#FB8C00", fg: "#FFFFFF" };
    case "error":
      return { bg: "#E53935", fg: "#FFFFFF" };
    case "default":
    default:
      return { bg: "#E5E5E5", fg: "#000000" };
  }
};

export const Pill: React.FC<PillProps> = ({ label, onPress, active = false, pressable, state = "default" }) => {
  const { bg, fg } = getStateColors(state);
  const isPressable = typeof pressable === "boolean" ? pressable : !!onPress;

  if (isPressable && onPress) {
    const bg = active ? "#2563EB" : "#E5E5E5";
    const fg = active ? "#FFFFFF" : "#000000";
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: bg }] }>
        <Text style={{ color: fg }}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={{ color: fg }}>{label}</Text>
    </View>
  );
};
