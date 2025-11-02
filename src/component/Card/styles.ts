import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 0,
        paddingVertical: 8,
    },
    sectionHeader: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#F3F4F6",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    sectionHeaderText: {
        color: "#374151",
        fontWeight: "600",
    },
    emptyContainer: {
        padding: 16,
        alignItems: "center",
    },
    emptyText: {
        color: "#666",
    },
    card: {
        width: "100%",
        backgroundColor: "#f7f7f7",
        borderRadius: 8,
        padding: 12,
        borderTopWidth: 4,
        borderTopColor: "transparent",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        flex: 1,
        marginRight: 8,
    },
    status: {
        fontSize: 14,
        color: "#666",
    },
    priority: {
        fontSize: 12,
        color: "#999",
    },
    pillRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
    },
});

export const getPriorityColor = (priority: string): string => {
    const p = (priority || "").toLowerCase();
    switch (p) {
        case "high":
        case "alta":
        case "alto":
            return "#e53935";
        case "medium":
        case "media":
            return "#fb8c00";
        case "low":
        case "baja":
            return "#43a047";
        default:
            return "#607d8b";
    }
};