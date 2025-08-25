"use client";

import { useEffect } from "react";
import { useWebApp } from "../hooks/useWebApp";

export default function ClientEvents() {
	const WebApp = useWebApp();

	useEffect(() => {
		if (WebApp) {
			WebApp.lockOrientation();
			WebApp.disableVerticalSwipes();
			WebApp.requestFullscreen();
			WebApp.setHeaderColor("#060211");
			WebApp.setBottomBarColor("#060211");
		}

		const preventGesture = (e: Event) => e.preventDefault();
		const preventTouchStart = (e: TouchEvent) => {
			if (e.touches.length > 1) e.preventDefault();
		};

		document.addEventListener("gesturestart", preventGesture, {
			passive: false,
		});
		document.addEventListener("dblclick", preventGesture, {
			passive: false,
		});
		document.addEventListener("touchstart", preventTouchStart, {
			passive: false,
		});

		return () => {
			document.removeEventListener("gesturestart", preventGesture);
			document.removeEventListener("dblclick", preventGesture);
			document.removeEventListener("touchstart", preventTouchStart);
		};
	}, []);

	return null;
}
