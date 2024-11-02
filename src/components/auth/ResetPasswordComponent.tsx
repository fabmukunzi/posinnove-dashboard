import { useResetPasswordMutation } from "@store/actions/auth";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResetPasswordForm {
	password: string;
	confirmPassword: string;
}

const ResetPasswordComponent = () => {
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const router = useRouter();
	const { token } = router.query;

	const onFinish = async (values: ResetPasswordForm) => {
		const { password, confirmPassword } = values;

		if (password !== confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}

		try {
			if (!token) {
				toast.error("Invalid or expired token.");
				router.push("/login");
				return;
			}

			const res = await resetPassword({
				token: token as string,
				password,
			}).unwrap();
			toast.success(res.message);
			router.push("/login");
		} catch (error: any) {
			toast.error(
				error?.data?.message || error?.message || "An error occurred."
			);
			console.error(error);
		}
	};

	return (
		<div className="w-ful h-full flex flex-col items-center justify-center">
			<div className="lg:w-3/4 w-full flex items-center justify-center p-5">
				<div className="w-full bg-white h-full p-10 rounded shadow-xl">
					<h1 className="text-center text-2xl font-bold my-4">
						Reset Password
					</h1>

					<Form
						name="reset-password"
						onFinish={onFinish}
						layout="vertical"
						className="space-y-4"
					>
						<Form.Item
							label="New Password"
							name="password"
							rules={[
								{ required: true, message: "Please enter your new password" },
								{
									min: 6,
									message: "Password must be at least 6 characters long",
								},
							]}
						>
							<Input.Password
								placeholder="Enter your new password"
								className="w-full border border-gray-300 "
							/>
						</Form.Item>

						<Form.Item
							label="Confirm Password"
							name="confirmPassword"
							dependencies={["password"]}
							rules={[
								{ required: true, message: "Please confirm your password" },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Passwords do not match"));
									},
								}),
							]}
						>
							<Input.Password
								placeholder="Confirm your new password"
								className="w-full border border-gray-300"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								loading={isLoading}
								htmlType="submit"
								type="primary"
								block
								className="my-3"
								disabled={isLoading}
							>
								{isLoading ? "Resetting..." : "Reset"}
							</Button>
						</Form.Item>
					</Form>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordComponent;
