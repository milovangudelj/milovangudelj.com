export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				style={{
					height: "100vh",
					maxHeight: "100dvh",
					margin: 0,
					padding: 0,
					overflow: "auto",
					overscrollBehavior: "none",
					WebkitFontSmoothing: "antialiased",
					MozOsxFontSmoothing: "grayscale",
				}}
			>
				{children}
			</body>
		</html>
	);
}
