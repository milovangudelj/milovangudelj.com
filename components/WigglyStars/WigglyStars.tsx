"use client";

import { useEffect, useState } from "react";

import { Star } from "@components/Star";

export const WigglyStars = () => {
	const [animateS0, setAnimateS0] = useState(false);
	const [animateS1, setAnimateS1] = useState(false);
	const [animateS2, setAnimateS2] = useState(false);

	useEffect(() => {
		const wiggle = () => {
			const star = Math.floor(Math.random() * 3);
			switch (star) {
				case 0:
					setAnimateS0(true);
					break;
				case 1:
					setAnimateS1(true);
					break;
				case 2:
					setAnimateS2(true);
					break;
			}
		};

		const interval = setInterval(wiggle, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="absolute top-0 right-0 -mt-4 mr-20 h-[180px] w-[117px] -translate-y-1/3 scale-50 md:top-1/2 md:mr-16 md:mt-0 md:-translate-y-1/2 md:scale-75 xl:mr-48 xl:scale-100">
			<Star
				delay={0.3}
				animate={animateS0}
				onAnimationEnd={() => setAnimateS0(false)}
				className="absolute top-[99px] left-[99px]"
			/>
			<Star
				width={36}
				height={60}
				delay={0.6}
				animate={animateS1}
				onAnimationEnd={() => setAnimateS1(false)}
				animation="inverse"
				className="absolute top-0 left-[63px]"
			/>
			<Star
				width={54}
				height={90}
				animate={animateS2}
				onAnimationEnd={() => setAnimateS2(false)}
				className="absolute top-[90px] left-0"
			/>
		</div>
	);
};
