import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaAt } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Link from "next/link";

const SocialMediaComponent = () => {
	const [copied, setCopied] = useState<number | null>(null);

	const socialData = [
		{
			title: "Aphrodis Uwineza",
			icon: <FaLinkedin className="text-blue-800 text-xl" />,
			linkToShare: "https://www.linkedin.com/in/aphrodis-uwineza-961079281/",
		},
		{
			title: "Aphrodis Garrix",
			icon: <FaFacebook className="text-lg text-blue-800" />,
			linkToShare: "facebook.com/",
		},
		{
			title: "Aphrodis Garrix",
			icon: <BsInstagram className="text-red-400 text-lg" />,
			linkToShare: "https://www.linkedin.com/in/aphrodis-uwineza-961079281/",
		},
		{
			title: "Aphrodis",
			icon: <FaAt className="text-lg text-red-400" />,
			linkToShare: "https://www.linkedin.com/in/aphrodis-uwineza-961079281/",
		},
		{
			title: "Aphrodis",
			icon: <IoLogoYoutube className="text-lg text-red-500" />,
			linkToShare: "https://www.linkedin.com/in/aphrodis-uwineza-961079281/",
		},
	];
	return (
		<div>
			<div className="grid grid-cols-2 gap-y-3 mt-3">
				{socialData.map((data, idx) => (
					<div key={idx} className="flex items-center gap-2">
						<div>{data.icon}</div>
						<div className="flex items-center gap-2">
							<span>{data.title}</span>
							<CopyToClipboard
								text={data.linkToShare}
								onCopy={() => setCopied(idx)}
							>
								<div className={` `}>
									{copied === idx ? (
										<TiTick className="text-2xl text-green-500" />
									) : (
										<LuCopy className={` text-black`} />
									)}
								</div>
							</CopyToClipboard>
						</div>
					</div>
				))}
				<div className="">
					<Link href={"#"} className="underline text-primary">
						View my resume
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SocialMediaComponent;
