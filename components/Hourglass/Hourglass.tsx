import { ReactNode } from "react";

type HourglassProps = {
	children: ReactNode;
};

export const Hourglass = ({ children }: HourglassProps) => {
	return (
		<div className="relative">
			<svg
				viewBox="0 0 273 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="h-[300px] md:h-[398px] absolute top-1 left-1"
			>
				<path
					d="M271.166 234.332V299H1.05566V234.332C1.05566 219.102 6.95335 202.348 16.1107 187.259C25.0644 172.505 37.1187 159.369 49.7724 150.829L51.0006 150L49.7724 149.171C37.1187 140.631 25.0644 127.495 16.1107 112.741C6.95335 97.6515 1.05566 80.8977 1.05566 65.6682V1H271.166V65.6682C271.166 80.8977 265.269 97.6515 256.111 112.741C247.158 127.495 235.103 140.631 222.449 149.171L221.221 150L222.449 150.829C235.103 159.369 247.158 172.505 256.111 187.259C265.269 202.348 271.166 219.102 271.166 234.332Z"
					fill="#FFC700"
					className="stroke-2 stroke-black fill-black"
				/>
			</svg>
			<svg
				viewBox="0 0 273 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="h-[300px] md:h-[398px] relative"
			>
				{/* <filter id="dropshadow" height="130%">
					<feGaussianBlur in="SourceAlpha" stdDeviation="0" />
					<feOffset dx="4" dy="4" result="offsetblur" />
					<feComponentTransfer>
						<feFuncA type="linear" slope="1" />
					</feComponentTransfer>
					<feMerge>
						<feMergeNode />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter> */}
				<path
					d="M271.166 234.332V299H1.05566V234.332C1.05566 219.102 6.95335 202.348 16.1107 187.259C25.0644 172.505 37.1187 159.369 49.7724 150.829L51.0006 150L49.7724 149.171C37.1187 140.631 25.0644 127.495 16.1107 112.741C6.95335 97.6515 1.05566 80.8977 1.05566 65.6682V1H271.166V65.6682C271.166 80.8977 265.269 97.6515 256.111 112.741C247.158 127.495 235.103 140.631 222.449 149.171L221.221 150L222.449 150.829C235.103 159.369 247.158 172.505 256.111 187.259C265.269 202.348 271.166 219.102 271.166 234.332Z"
					fill="#FFC700"
					className="stroke-2 stroke-black"
				/>

				<foreignObject className="w-full h-full relative">
					<div className="absolute inset-0 flex items-center justify-center">
						{children}
					</div>
				</foreignObject>
			</svg>
		</div>
	);
};
