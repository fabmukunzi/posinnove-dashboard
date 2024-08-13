import { useVerifyEmailQuery } from "@store/actions/auth";
import { Button, Result, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const Verify = ({ token }: { token: string }) => {
	const { isLoading, isSuccess, isError } = useVerifyEmailQuery(token);
	const { push } = useRouter();
	return (
		<div className="bg-white h-screen flex flex-col items-center justify-center p-4">
			{isLoading ? (
				<div className="flex flex-col items-center">
					<Spin size="large" />
				</div>
			) : isSuccess ? (
				<Result
					status="success"
					title="Email Verified Successfully!"
					subTitle="Your email has been verified. You can now login"
					extra={[
						<Button type="primary" key="login" onClick={() => push("/login")}>
							Go to Login
						</Button>,
					]}
				/>
			) : isError ? (
				<Result
					status="error"
					title="Verification Failed"
					subTitle={
						"There was an issue verifying your email. Please try again."
					}
					extra={[
						<Button key="home" onClick={() => push("/")}>
							Go to Home
						</Button>,
					]}
				/>
			) : (
				<Title level={3}>Please wait...</Title>
			)}
		</div>
	);
};

export default Verify;
