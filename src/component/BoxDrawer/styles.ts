import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	sheetBackground: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	handle: {
		backgroundColor: "#D0D5DD",
		width: 48,
		height: 6,
		borderRadius: 3,
		alignSelf: "center",
		marginTop: 8,
		marginBottom: 8,
	},
	header: {
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
	content: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	pillRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
});

