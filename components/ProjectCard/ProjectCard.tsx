import Image from "next/image";

import dummy from "../../public/dummy.png";

export const ProjectCard = () => {
	return (
		<div>
			<span className="relative bg-black border-2 inline-block w-[266.5px] h-[150px] [filter:drop-shadow(4px_4px_0_black)]">
				<Image src={dummy} layout="fill" />
			</span>
			<div className="flex flex-col mt-8">
				<span className="text-sub-heading-mobile salt-4">
					Swim club Agordo →
				</span>
				<span className="text-body-sm">https://project.com</span>
			</div>
		</div>
	);
};
