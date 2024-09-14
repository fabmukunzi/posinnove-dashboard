import { profileImage } from "@utils/images";

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
			<div className="flex items-center p-2 gap-4 border-2 bg-black/5 rounded-l-full rounded-r-full">
				<div className="w-10 h-10 rounded-full overflow-hidden border-4">
					<img
						src={profile}
						alt="image"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex items-center gap-4">
					<div>
						<h1 className="text-lg">{title}</h1>
						<p className="text-sm text-black/50">{date}</p>
					</div>
					<span>{duration}</span>
				</div>
			</div>
		</div>
	);
};

export default WorkingExperienceCard;
