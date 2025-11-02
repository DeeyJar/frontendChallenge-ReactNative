import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { styles } from "./styles";
import { CheckboxProps } from "../../modal/component/Checkbox";

export const Checkbox: React.FC<CheckboxProps> = ({
    checked: controlledChecked,
    onChange,
    initialChecked = false,
    size = 20,
}) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(initialChecked);

    const isControlled = typeof controlledChecked === "boolean";
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const toggle = () => {
        const next = !checked;
        if (isControlled) {
            onChange?.(next);
        } else {
            setUncontrolledChecked(next);
            onChange?.(next);
        }
    };

    return (
        <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            onPress={toggle}
            style={[styles.box, { width: size, height: size, borderRadius: 4 }]}
        >
            {checked ? (
                <View style={[styles.inner, { width: size - 8, height: size - 8, borderRadius: 2 }]} />
            ) : null}
        </Pressable>
    );
};