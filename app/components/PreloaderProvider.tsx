"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function PreloaderProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setFadeOut(true);
			setTimeout(() => setLoading(false), 500);
		}, 6500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{loading && <Preloader fadeOut={fadeOut} />}
			{!loading && children}
		</>
	);
}
