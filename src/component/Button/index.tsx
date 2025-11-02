import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { ButtonComponentProps, ButtonState } from "../../modal/component/Button";

const getColors = (state: ButtonState) => {
  switch (state) {
    case "success":
      return { backgroundColor: "#12B76A" };
    case "error":
      return { backgroundColor: "#E53935" };
    case "warning":
      return { backgroundColor: "#FB8C00" };
    case "default":
    default:
      return { backgroundColor: "#2563EB" };
  }
};

export const ButtonComponent = ({ title, onPress, loading, state = "default", disabled }: ButtonComponentProps) => {
  const { backgroundColor } = getColors(state);
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress} disabled={loading || disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};