import React, { useMemo, useRef } from "react";
import { Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Pill } from "../Pill";
import { styles } from "./styles";
import { useTaskContext } from "../../context/TaskContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { usePriorityContext } from "../../context/PriorityContext";

export const BoxDrawer: React.FC = () => {
  const { toggleFilter, activeFilters, clearAllFilters } = useTaskContext();
  const { categories } = useCategoryContext();
  const { priorities } = usePriorityContext();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["12%", "30%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView>
        <View style={styles.header}>
          <Text onPress={clearAllFilters} style={{ color: "blue" }}>
            Clear all
          </Text>
        </View>

        <View style={styles.content}>
          <Text>Status</Text>
          <View style={styles.pillRow}>
            {(["pending", "completed"] as const).map((status) => {
              const isActive = activeFilters.statuses?.includes(status);
              const label = status === "pending" ? "Pending" : "Completed";
              return (
                <Pill
                  key={status}
                  label={label}
                  onPress={() => toggleFilter("statuses", status)}
                  active={!!isActive}
                />
              );
            })}
          </View>

          <Text>Categories</Text>
          <View style={styles.pillRow}>
            {categories.map((category) => {
              const isActive = activeFilters.categories.includes(category.name.toLowerCase());
              return (
                <Pill
                  key={category.id}
                  label={category.name}
                  onPress={() => toggleFilter("categories", category.name.toLowerCase())}
                  active={isActive}
                />
              );
            })}
          </View>

          <Text>Priorities</Text>
          <View style={styles.pillRow}>
            {priorities.map((priority) => {
              const isActive = activeFilters.priorities.includes(priority.level.toLowerCase());
              return (
                <Pill
                  key={priority.id}
                  label={priority.level}
                  onPress={() => toggleFilter("priorities", priority.level.toLowerCase())}
                  active={isActive}
                />
              );
            })}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
