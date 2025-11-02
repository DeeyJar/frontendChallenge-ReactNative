import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
    },
    selectionBar: {
        paddingVertical: 8,
        gap: 8,
    },
    selectionText: {
        fontSize: 18,
        fontWeight: "600",
    },
    selectionActions: {
        flexDirection: "row",
        gap: 16,
    },
    link: {
        color: "#1D4ED8",
        textDecorationLine: "underline",
    },
    listArea: {
        flex: 1,
        marginTop: 12,
    },
    bulkActionsContainer: {
        flexDirection: "row",
        gap: 24,
        paddingTop: 8,
        paddingBottom: 8,
    },
    bulkButton: {
        flex: 1,
    },
    noTaskArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noTaskImage: {
        width: "80%",
        height: 220,
        marginTop: 12,
    }
});