import { ActivityIndicator, Alert, FlatList, Pressable, SectionList, Text, View, Animated } from "react-native"
import React, { useEffect, useRef } from "react";
import { ITask } from "../../modal/dto/ITask";
import { styles, getPriorityColor } from "./styles";
import { Chip } from "../Chip";
import { Checkbox } from "../Checkbox";
import { CardComponentProps } from "../../modal/component/Card";

export const CardComponent = ({ data,
    emptyMessage,
    onToggleComplete,
    onRequestDelete,
    onPressItem,
    separateCompleted = false,
    bottomPadding = 0,
    isCompleting,
    isDeleting,
    refreshing = false,
    onRefresh
    }: CardComponentProps) => {
    const ItemRow: React.FC<{ item: ITask }> = ({ item }) => {
        const isCompleted = !!item.completed || (item.status || "").toLowerCase() === "completed";
        const completing = isCompleting?.(item.id as unknown as number) ?? false;
        const deleting = isDeleting?.(item.id as unknown as number) ?? false;
        const scale = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            if (completing) {
                Animated.sequence([
                    Animated.timing(scale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
                ]).start();
            }
        }, [completing, scale]);

        return (
            <View style={[styles.card, (completing || deleting) && { opacity: 0.85 }]}>
                <View style={styles.headerRow}>
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <Checkbox
                            checked={isCompleted}
                            onChange={(next) => !deleting && onToggleComplete?.(item.id as unknown as number, next)}
                        />
                    </Animated.View>
                    <Pressable onPress={() => onPressItem?.(item)}>
                        <Text style={[styles.title, isCompleted && { color: "#9CA3AF", textDecorationLine: "line-through" }]}>
                            {item.title}
                        </Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        disabled={deleting}
                        onPress={() => {
                            Alert.alert(
                                "Delete task",
                                `Do you want to delete "${item.title}"?`,
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Delete", style: "destructive", onPress: () => onRequestDelete?.(item.id as unknown as number) },
                                ]
                            );
                        }}
                    >
                        {deleting ? (
                            <ActivityIndicator size="small" color="#E53935" />
                        ) : (
                            <Text style={{ fontSize: 18 }}>🗑️</Text>
                        )}
                    </Pressable>
                </View>
                <View style={styles.pillRow}>
                    <Chip label={item.priority} color={getPriorityColor(item.priority)} textColor="#FFFFFF" />
                    <Chip label={item.category} variant="info" />
                    <Chip label={item.createdAt.toDateString()} variant="info" />
                </View>
            </View>
        );
    };
    const renderRow = ({ item }: { item: ITask }) => <ItemRow item={item} />;

    if (!separateCompleted) {
        return (
            <FlatList
                style={{ flex: 1 }}
                data={data}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{emptyMessage}</Text>
                    </View>
                }
                renderItem={renderRow}
            />
        );
    }

    const pending = data.filter((t) => !(t.completed || (t.status || "").toLowerCase() === "completed"));
    const completed = data.filter((t) => t.completed || (t.status || "").toLowerCase() === "completed");
    const sections = [
        ...(pending.length > 0 ? [{ title: `Pending tasks: ${pending.length}`, data: pending }] : []),
        ...(completed.length > 0 ? [{ title: `Completed tasks: ${completed.length}`, data: completed }] : []),
    ];

    return (
        <SectionList
            style={{ flex: 1 }}
            sections={sections as any}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{emptyMessage}</Text>
                </View>
            }
            renderSectionHeader={({ section }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{section.title}</Text>
                </View>
            )}
            renderItem={renderRow}
        />
    );
}
