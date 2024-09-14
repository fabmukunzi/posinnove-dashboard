import { TbPointFilled } from "react-icons/tb";

interface PortfolioCardProps {
	image: string;
	title: string;
	description: string;
	stack: string[];
}

const PortfolioCard = ({
	description,
	image,
	stack,
	title,
}: PortfolioCardProps) => {
	return (
		<div className="w-full h-full rounded-lg border p-3">
			<div className="flex flex-col items-center justify-between h-full">
				<div className="w-full h-64">
					<img
						src={image}
						alt="image"
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
				<div className="w-full h-full flex flex-col items-center gap-5 bg-black/5 p-2 mx-4 mt-4 rounded-lg">
					<div>
						<h1 className="text-2xl font-bold my-3">{title}</h1>
						<p className="text-sm">{description}</p>
					</div>
					<div className="flex items-center gap-2">
						{stack.map((item, idx) => (
							<div key={idx} className="flex items-center gap-2">
								<TbPointFilled className="text-red-700" />
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PortfolioCard;
