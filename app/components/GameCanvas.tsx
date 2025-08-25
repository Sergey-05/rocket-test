"use client";

import { useState, useEffect, useRef } from "react";

export default function LuckyJetGame() {
	const [state, setState] = useState<
		"waiting" | "flying" | "crashing" | "flewAway"
	>("waiting");
	const [coefficient, setCoefficient] = useState(1.0);
	const [position, setPosition] = useState({ x: 0, y: 0 }); // координаты центра человечка
	const [pathD, setPathD] = useState("M0 0 Q0 0 0 0");
	const [pathFillD, setPathFillD] = useState("M0 0 Q0 0 0 0 L0 0 Z");
	const [opacityMan, setOpacityMan] = useState(0);
	const [flewAwayOpacity, setFlewAwayOpacity] = useState(0);
	const [flewAwayHeight, setFlewAwayHeight] = useState(0);
	const [progressWidth, setProgressWidth] = useState(0);
	const [coeffPositionStyle, setCoeffPositionStyle] =
		useState<React.CSSProperties>({
			left: "8%",
			top: "10%",
			transform: "translateX(0%)",
			transition: "all 0.5s ease",
		});

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

	const flewAwayText = "Улетел";
	const waitingText = "Ожидание следующего раунда";

	const manWidth = 60;
	const manHeight = 60;

	const getRandomCrash = () => (Math.random() * 10 + 1.5).toFixed(2); // коэффициент краша

	// 📏 измеряем контейнер
	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				setContainerSize({
					width: containerRef.current.offsetWidth,
					height: containerRef.current.offsetHeight,
				});
			}
		};
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	// 🎮 игровой цикл
	const startWaitingAnimation = () => {
		let progress = 0;
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			progress += 1;
			setProgressWidth(progress);
			if (progress >= 100) {
				if (intervalRef.current) clearInterval(intervalRef.current);
				startGame();
			}
		}, 50);
	};

	const startGame = () => {
		if (containerSize.width === 0) return;

		setState("flying");
		setOpacityMan(1);
		setCoefficient(1.0);
		setFlewAwayOpacity(0);
		setFlewAwayHeight(0);
		setCoeffPositionStyle({
			left: "8%",
			top: "10%",
			transform: "translateX(0%)",
			transition: "all 0.5s ease",
		});

		const crashValue = parseFloat(getRandomCrash());
		let currentCoeff = 1.0;
		let manProgress = 0;
		const flightDuration = 3500; // 3.5s
		const flightStep = 30;
		const stepIncrement = flightStep / flightDuration;

		const startX = 0;
		const startY = containerSize.height;
		const endX = containerSize.width * 0.75;
		const endY = containerSize.height * 0.4;
		const controlX = containerSize.width * 0.45;
		const controlY = startY - containerSize.height * 0.15;

		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			currentCoeff = parseFloat((currentCoeff + 0.02).toFixed(2));
			setCoefficient(currentCoeff);

			if (manProgress < 1) {
				manProgress = Math.min(manProgress + stepIncrement, 1);

				const x =
					(1 - manProgress) ** 2 * startX +
					2 * (1 - manProgress) * manProgress * controlX +
					manProgress ** 2 * endX;
				const y =
					(1 - manProgress) ** 2 * startY +
					2 * (1 - manProgress) * manProgress * controlY +
					manProgress ** 2 * endY;

				setPosition({ x, y });
				setPathD(`M${startX} ${startY} Q${controlX} ${controlY} ${x} ${y}`);
				setPathFillD(
					`M${startX} ${startY} Q${controlX} ${controlY} ${x} ${y} L${x} ${startY} Z`
				);
			}

			if (currentCoeff >= crashValue) {
				if (intervalRef.current) clearInterval(intervalRef.current);
				setState("crashing");
				setCoeffPositionStyle({
					left: "50%",
					top: "10%",
					transform: "translateX(-50%)",
					transition: "all 0.8s ease",
				});
				flyAway(position.x, position.y);
				setFlewAwayOpacity(1);
				setFlewAwayHeight(24);
			}
		}, flightStep);
	};

	// старт первого ожидания при монтировании
	useEffect(() => {
		startWaitingAnimation();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [containerSize.width, containerSize.height]);

	// flyAway в конце вызывает startWaitingAnimation
	const flyAway = (startX: number, startY: number) => {
		let x = startX;
		let y = startY;

		const step = () => {
			x += 8;
			y -= 2;
			setPosition({ x, y });

			if (x < containerSize.width + 200) {
				requestAnimationFrame(step);
			} else {
				setOpacityMan(0);
				setState("flewAway");

				timeoutRef.current = setTimeout(() => {
					setState("waiting");
					setCoefficient(1.0);
					setFlewAwayOpacity(0);
					setFlewAwayHeight(0);
					setProgressWidth(0);
					setCoeffPositionStyle({
						left: "8%",
						top: "10%",
						transform: "translateX(0%)",
						transition: "all 0.5s ease",
					});
					startWaitingAnimation(); // <--- важное изменение
				}, 5000);
			}
		};

		requestAnimationFrame(step);
	};

	return (
		<div
			ref={containerRef}
			className="grid m-[10px_10px_0] h-[208px] sticky top-[70px] z-[19] pointer-events-none text-white font-sans"
		>
			<div className="relative z-[19] overflow-hidden w-full h-full border border-[#261C4A] rounded-[12px] bg-[#151028]">
				{/* Фоновые слои */}
				{state !== "waiting" && (
					<div className="absolute w-full h-full overflow-hidden z-0">
						<div className="absolute w-full h-full bg-[url('/assets/stars.png')] bg-repeat-x bg-contain z-0"></div>
						<div className="absolute w-full h-[40%] bottom-[-20%] bg-[url('/assets/clouds.svg')] bg-repeat-x bg-cover animate-cloudScroll z-1"></div>
						<div className="absolute bottom-0 left-[10px] w-full h-[10px] bg-[url('/assets/bottom.svg')] bg-repeat-x animate-borderScroll border-t border-[#261C4A] z-2"></div>
						<div className="absolute bottom-0 left-0 w-[10px] h-full bg-[url('/assets/left.svg')] bg-repeat-y animate-borderScrollY border-r border-[#261C4A] z-3"></div>
					</div>
				)}

				{/* Игровой блок */}
				{state !== "waiting" && (
					<>
						{/* Траектория */}
						<svg
							width="100%"
							height="100%"
							className="absolute top-0 left-0 z-4"
						>
							<defs>
								<linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
									<stop stopColor="#9d7aff" stopOpacity="0.33" />
									<stop offset="0.987" stopColor="#9d7aff" stopOpacity="0" />
								</linearGradient>
								<linearGradient id="grad_stroke" x1="0" x2="1" y1="0" y2="1">
									<stop stopColor="#9D7AFF" />
									<stop offset="0.787" stopColor="#622BFC" />
									<stop offset="1" stopColor="#5c24fc" stopOpacity="0" />
								</linearGradient>
							</defs>
							<g>
								<path
									d={pathD}
									fill="transparent"
									stroke="url(#grad_stroke)"
									strokeWidth="2"
								/>
								<path d={pathFillD} fill="url(#grad)" />
							</g>
						</svg>

						{/* Человечек (позиция по центру) */}
						<div
							style={{
								position: "absolute",
								left: position.x - manWidth / 2,
								top: position.y - manHeight / 2,
								opacity: opacityMan,
								width: manWidth,
								height: manHeight,
								zIndex: 5,
							}}
						>
							<div className="relative w-full h-full">
								<img
									src="/assets/flame.svg"
									alt="flame"
									className="absolute w-[48%] mt-[70%] -ml-[45%] rotate-[-138deg] origin-center"
								/>
								<img
									src="/assets/light.webp"
									alt="light"
									className="absolute w-full mt-[45%] -ml-[50%] rotate-[36deg]"
								/>
								<img
									src="/assets/man.webp"
									alt="man"
									className="absolute w-full transition-all duration-300"
								/>
							</div>
						</div>

						{/* Коэффициент */}
						<div
							style={{
								position: "absolute",
								top: coeffPositionStyle.top,
								left: coeffPositionStyle.left,
								transform: coeffPositionStyle.transform,
								transition: coeffPositionStyle.transition,
								zIndex: 6,
							}}
							className="text-[50px] font-black text-[#944EF5] font-['Roboto'] tabular-nums"
						>
							x{coefficient.toFixed(2)}
						</div>

						{/* Текст "Улетел" */}
						{state === "flewAway" && (
							<div
								className="font-rocket"
								style={{
									position: "absolute",
									top: "40%",
									left: "50%",
									transform: "translateX(-50%)",
									opacity: flewAwayOpacity,
									height: `${flewAwayHeight}px`,
									transition: "all 0.5s ease",
									fontSize: "20px",
									textTransform: "uppercase",
									color: "#fff",
									zIndex: 7,
								}}
							>
								{flewAwayText}
							</div>
						)}
					</>
				)}

				{/* Блок ожидания */}
				{state === "waiting" && (
					<div className="grid p-4 place-content-center place-items-center gap-4 w-full h-full absolute z-[100]">
						<img
							alt="waiting"
							width={30}
							height={30}
							src="/assets/waiting.svg"
							className="w-30 h-30 mt-4"
						/>
						<div className="font-rocket text-[16px] leading-[21px] text-center uppercase text-white px-4">
							{waitingText}
						</div>
						<div className="bg-[rgba(255,255,255,0.1)] rounded-[24px] h-[6px] w-[213px] mb-4">
							<div
								className="relative left-[1px] top-[1px] bg-[#944EF5] rounded-[10px] h-[4px] transition-all duration-50 ease-linear"
								style={{ width: `${progressWidth}%` }}
							></div>
						</div>
					</div>
				)}
			</div>

			{/* Анимации облаков */}
			<style jsx>{`
				@keyframes cloudScroll {
					0% {
						background-position-x: 0;
					}
					100% {
						background-position-x: -2000px;
					}
				}
				@keyframes borderScroll {
					0% {
						background-position-x: 0;
					}
					100% {
						background-position-x: -71px;
					}
				}
				@keyframes borderScrollY {
					0% {
						background-position-y: 0;
					}
					100% {
						background-position-y: 71px;
					}
				}
				.animate-cloudScroll {
					animation: cloudScroll 60s linear infinite;
				}
				.animate-borderScroll {
					animation: borderScroll 5s linear infinite;
				}
				.animate-borderScrollY {
					animation: borderScrollY 5s linear infinite;
				}
			`}</style>
		</div>
	);
}
