import { profileImage } from "@utils/images";
import { Image } from "antd";

interface WorkingExperienceCardProps {
	title: string;
	profile: string;
	date: string;
	duration: string;
}

const WorkingExperienceCard = ({
	date,
	duration,
	profile,
	title,
}: WorkingExperienceCardProps) => {
	return (
		<div>
			<div className="flex items-center p-2 lg:gap-4 gap-1 border-2 bg-black/5 rounded-l-full rounded-r-full">
				<div className="w-10 h-10 rounded-full overflow-hidden border-4">
					<Image
						preview={false}
						src={profile}
						alt="image"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex items-center lg:gap-4 gap-2">
					<div>
						<h1 className="lg:text-lg text-sm">{title}</h1>
						<p className="lg:text-sm text-black/50 text-xs">{date}</p>
					</div>
					<span className="text-[10px]">{duration}</span>
				</div>
			</div>
		</div>
	);
};

export default WorkingExperienceCard;
