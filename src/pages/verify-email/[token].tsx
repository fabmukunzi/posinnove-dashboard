import Verify from "@components/auth/verify-user";
import { GetServerSideProps } from "next";

const VerifyPage = ({ token }: { token: string }) => {
	return (
		<div>
			<Verify token={token} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { token } = context.query;

	if (typeof token !== "string") {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			token,
		},
	};
};

export default VerifyPage;
