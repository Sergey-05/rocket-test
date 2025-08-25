"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import { useWebApp } from "@/app/hooks/useWebApp";

export default function DataLoader() {
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [progress, setProgress] = useState(0);
	const [webAppReady, setWebAppReady] = useState(false);

	const WebApp = useWebApp();

	// Проверка готовности WebApp
	useEffect(() => {
		if (WebApp && WebApp.initDataUnsafe?.user) {
			setWebAppReady(true);
		}
	}, [WebApp]);

	useEffect(() => {
		let isMounted = true;

		const loadData = async () => {
			if (!WebApp?.initDataUnsafe?.user) return;

			// Настройки Telegram WebApp
			WebApp.lockOrientation();
			WebApp.disableVerticalSwipes();
			WebApp.requestFullscreen();
			WebApp.setHeaderColor("#060211");
			WebApp.setBottomBarColor("#060211");

			// Шаговый прогресс загрузки
			const steps = [20, 45, 70, 90, 100];
			steps.forEach((value, i) => {
				setTimeout(() => {
					if (isMounted) setProgress(value);
				}, i * 1000 + 500);
			});

			// Имитация загрузки данных
			await new Promise((resolve) =>
				setTimeout(resolve, steps.length * 1000 + 500)
			);

			if (isMounted) {
				setFadeOut(true);
				setTimeout(() => setIsDataLoaded(true), 500); // плавное скрытие
			}
		};

		if (webAppReady) loadData();

		return () => {
			isMounted = false;
		};
	}, [webAppReady, WebApp]);

	// Пока данные не загружены — показываем Preloader
	if (!isDataLoaded) return <Preloader fadeOut={fadeOut} progress={progress} />;

	return null;
}
