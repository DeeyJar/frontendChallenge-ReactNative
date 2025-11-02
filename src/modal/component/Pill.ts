export type PillState = "default" | "success" | "warning" | "error";

export interface PillProps {
  label: string;
  onPress?: () => void;
  active?: boolean;
  pressable?: boolean;
  state?: PillState;
}