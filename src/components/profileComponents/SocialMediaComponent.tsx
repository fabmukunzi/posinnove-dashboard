import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { FaLinkedin, FaFacebook, FaAt } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import Link from "next/link";

const SocialMediaComponent = () => {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const socialData = [
		{
			title: "Aphrodis Uwineza",
			name: "LinkedIn",
			icon: <FaLinkedin className="text-blue-800 text-xl" />,
			linkToShare: "https://www.linkedin.com/in/aphrodis-uwineza-961079281/",
		},
		{
			title: "Aphrodis Garrix",
			name: "Facebook",
			icon: <FaFacebook className="text-lg text-blue-800" />,
			linkToShare: "https://www.facebook.com/aphrodisgarrix",
		},
		{
			title: "Aphrodis Garrix",
			name: "Instagram",
			icon: <BsInstagram className="text-red-400 text-lg" />,
			linkToShare: "https://www.instagram.com/aphrodisgarrix/",
		},
		{
			title: "Aphrodis",
			name: "Dribbble",
			icon: <FaAt className="text-lg text-red-400" />,
			linkToShare: "https://dribbble.com/aphrodis",
		},
		{
			title: "Aphrodis",
			name: "YouTube",
			icon: <IoLogoYoutube className="text-lg text-red-500" />,
			linkToShare: "https://www.youtube.com/c/Aphrodis",
		},
	];

	return (
		<div>
			<div className="md:grid grid-cols-2 gap-y-3 mt-3 flex flex-col">
				{socialData.map((data, idx) => (
					<div key={idx} className="flex items-center gap-2">
						<div>{data.icon}</div>
						<div className="flex items-center gap-2 text-xl lg:text-sm">
							<span>
								{copiedIndex === idx
									? `Share your ${data.name} link`
									: data.title}
							</span>
							<CopyToClipboard
								text={data.linkToShare}
								onCopy={() => setCopiedIndex(idx)}
							>
								<div>
									{copiedIndex === idx ? (
										<TiTick className="text-2xl text-green-500" />
									) : (
										<LuCopy className="text-black" />
									)}
								</div>
							</CopyToClipboard>
						</div>
					</div>
				))}
				<div>
					<Link href="#" className="underline text-primary">
						View my resume
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SocialMediaComponent;
