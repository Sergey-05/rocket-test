// app/components/Preloader.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function Preloader({ fadeOut }: { fadeOut?: boolean }) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// точки останова
		const steps = [20, 45, 70, 90, 100];
		steps.forEach((value, i) => {
			setTimeout(() => setProgress(value), i * 1000 + 500); // каждые 1с + задержка
		});
	}, []);

	return (
		<>
			<style jsx>{`
				.preloader-container {
					position: fixed;
					display: flex;
					top: 0;
					left: 0;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background: url("/assets/bg.webp") #060211;
					background-size: 120% auto;

					background-position: center;
					width: 100%;
					height: 100%;
					overflow: hidden;
					box-sizing: border-box;
				}

				.animation {
					width: 238px;
					height: 238px;
				}

				.content {
					position: relative;
					width: 100%;
					height: 100%;
				}

				@keyframes shinePulse {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(0.85);
					}
				}

				@keyframes starPulse {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.15);
					}
				}

				@keyframes letterJump {
					0%,
					20%,
					100% {
						transform: translateY(0);
					}
					7% {
						transform: translateY(10px);
					}
					14% {
						transform: translateY(-20px);
					}
				}

				@keyframes manMove {
					0%,
					100% {
						transform: translate(0, 0);
					}
					50% {
						transform: translate(10px, -10px);
					}
				}

				.logo {
					margin-bottom: 50px;
					width: 70px;
				}

				.item {
					position: absolute;
					top: 0;
					left: 0;
					transition-timing-function: ease-in-out;
				}

				.mask {
					border-radius: 50%;
					overflow: hidden;
					width: 238px;
					height: 238px;
					max-width: 238px;
					max-height: 238px;
					transform: translateZ(0);
				}

				.name {
					top: 100%;
					left: 50%;
				}

				.bg-shine {
					width: 238px;
					height: 238px;
					max-width: 238px;
					max-height: 238px;
					background: #c86edb;
					animation: shinePulse 3s ease-in-out 0s infinite reverse;
					border-radius: 50%;
					box-shadow: 0 0 100px #8e46ff;
				}

				.bg-circle {
					width: 238px;
					height: 238px;
					background: linear-gradient(135deg, #b172ff, #8e46ff);
					border-radius: 300px;
				}

				.bg {
					background-image: url("/assets/sprite.webp");
				}

				.bg-l {
					top: -20px;
					left: -129px;
					width: 63px;
					height: 96px;
					background-position: -401px -1px;
					animation: letterJump 4s ease-in-out 0.5s infinite;
				}

				.bg-u {
					top: 8px;
					left: -81px;
					width: 56px;
					height: 67px;
					background-position: -401px -271px;
					animation: letterJump 4s ease-in-out 0.6s infinite;
				}

				.bg-c {
					top: -32px;
					left: -33px;
					filter: drop-shadow(0 -3px 5px #2f165866);
					width: 62px;
					height: 109px;
					background-position: -328px -99px;
					animation: letterJump 4s ease-in-out 0.7s infinite;
				}

				.bg-k {
					top: 1px;
					left: 29px;
					width: 54px;
					height: 74px;
					background-position: -401px -195px;
					animation: letterJump 4s ease-in-out 0.8s infinite;
				}

				.bg-y {
					top: -20px;
					left: 73px;
					width: 70px;
					height: 96px;
					background-position: -328px -210px;
					animation: letterJump 4s ease-in-out 0.9s infinite;
				}

				.bg-j {
					top: 80px;
					left: -87px;
					width: 61px;
					height: 94px;
					background-position: -401px -99px;
					animation: letterJump 4s ease-in-out 0.6s infinite;
				}

				.bg-e {
					top: 93px;
					left: -24px;
					width: 51px;
					height: 72px;
					background-position: -328px -308px;
					animation: letterJump 4s ease-in-out 0.75s infinite;
				}

				.bg-t {
					top: 81px;
					left: 22px;
					width: 71px;
					height: 96px;
					background-position: -328px -1px;
					animation: letterJump 4s ease-in-out 0.9s infinite;
				}

				.bg-star {
					top: -10px;
					left: -10px;
					width: 47px;
					height: 51px;
					background-position: -401px -340px;
					animation: starPulse 3s ease-in-out 0s infinite;
				}

				.bg-star-2 {
					top: 140px;
					left: 208px;
				}

				.bg-man {
					top: -18%;
					left: -25%;
					width: 325px;
					height: 397px;
					background-position: -1px -1px;
					animation: manMove 1.5s ease-in-out 0s infinite;
				}

				.middle {
					margin-top: -50px;
					height: 363px;
					transform: scale(0.85);
				}

				@media (max-width: 600px) or (max-height: 600px) {
					.middle {
						transform: scale(0.75);
					}
				}

				@media (max-width: 450px) or (max-height: 450px) {
					.middle {
						transform: scale(0.66);
					}
				}

				@media (max-height: 570px) {
					.logo {
						display: none;
					}
					.preloader-container {
						justify-content: center;
						padding: 30px 0;
					}
				}

				@media (max-height: 475px) {
					.progress {
						display: none;
					}
				}

				.progress {
					width: 280px;
					max-width: calc(100% - 30px);
					height: 9px;
					border-radius: 9px;
					margin: 30px -30px 0;
					position: relative;
					background: #161024; /* фон прогресс-бара */
					overflow: hidden;
				}

				.progress__line {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					border-radius: 9px;
					background: linear-gradient(90deg, #ff9c00, #ff8500);
					width: 0%;
					transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
				}
			`}</style>
			<div
				className={`preloader-container transition-opacity duration-500 z-10 ${
					fadeOut ? "opacity-0" : "opacity-100"
				}`}
			>
				<div className="middle">
					<div className="animation">
						<div className="content">
							<div className="item bg-shine"></div>
							<div className="item bg-circle"></div>

							<div className="item mask">
								<div className="item bg bg-man"></div>
							</div>

							<div className="item bg bg-man" style={{ height: "150px" }}></div>
							<div
								className="item bg bg-man"
								style={{
									width: "120px",
									backgroundPositionX: "-201px",
									marginLeft: "200px",
									height: "286px",
								}}
							></div>

							<div className="item name">
								<div className="item bg bg-l"></div>
								<div className="item bg bg-u"></div>
								<div className="item bg bg-c"></div>
								<div className="item bg bg-k"></div>
								<div className="item bg bg-y"></div>
								<div className="item bg bg-j"></div>
								<div className="item bg bg-e"></div>
								<div className="item bg bg-t"></div>
							</div>

							<div className="item bg bg-star"></div>
							<div className="item bg bg-star bg-star-2"></div>
						</div>
					</div>
				</div>

				<div className="progress">
					<div
						className="progress__line"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>
		</>
	);
}
