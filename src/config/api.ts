import Constants from "expo-constants";
import { NativeModules } from "react-native";

const extra = (Constants.expoConfig && (Constants.expoConfig as any).extra) || {};
const explicitUrl = (extra.API_URL as string) || "";

function getDevServerHost(): string | undefined {
	const hostUri = (Constants as any)?.expoConfig?.hostUri as string | undefined;
	if (hostUri) return hostUri.split(":")[0];

	const scriptURL = (NativeModules as any)?.SourceCode?.scriptURL as string | undefined;
	if (scriptURL) {
		const match = scriptURL.match(/^https?:\/\/([^:/]+)(?::\d+)?\//);
		if (match) return match[1];
	}
	return undefined;
}

const isBadExplicit = explicitUrl.includes("0.0.0.0");
const inferredHost = getDevServerHost();

export const API_URL: string = !explicitUrl || isBadExplicit
	? (inferredHost ? `http://${inferredHost}:3000` : "http://192.168.1.100:3000")
	: explicitUrl;
