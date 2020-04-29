import { Config } from "../../config";

export function ExitApp (): void {
	const nav = navigator as any;
	if (nav.app) {
		nav.app.exitApp();
	}
	else if (nav.device) {
		nav.device.exitApp();
	}
	else {
		window.close();
	}
}

export function FullscreenMode (): void {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	}
	else {
		if (document.exitFullscreen) {
			document.exitFullscreen(); 
		}
	}
}

export function IsInDevelopment (): boolean | undefined {
	return Config.physics?.arcade?.debug;
}

export function DebugLog (message?: any, ...optionalParams: any[]): void {
	if (optionalParams.length !== 0) {
		console.log("[Helper] " + message, optionalParams);
	}
	else {
		console.log("[Helper] " + message);
	}
}

export function CheckDevicePlatform (platformName: string | string[]): boolean {
	let isCompatible = false;
	let platformMap = new Map<string, boolean>();
	if (Array.isArray(platformName)) {
		for (const name of platformName) {
			const isPlatformExist = navigator.userAgent.indexOf(name) !== -1;
			platformMap.set(name, isPlatformExist);
		}
		platformMap.forEach((value, key) => {
			DebugLog(`Result platform ${key}:${value}`);
			if (value) {
				isCompatible = true;
			}
		});
	}
	else {
		isCompatible = navigator.userAgent.indexOf(platformName) !== -1;
	}
	return isCompatible;
}

export function RetrieveOnceJSON (cache: Phaser.Cache.BaseCache, key: string): any {
	let data = null;
	if (cache.has(key)) {
		data = cache.get(key);
		cache.remove(key);
	}
	console.assert(data !== null, "Retrieving a null value of JSON data");
	return data;
}