export type ButtonState = "success" | "warning" | "error" | "default";

export interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  state?: ButtonState;
  disabled?: boolean;
}
