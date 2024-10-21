import { useResetPasswordMutation } from "@store/actions/auth";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useForm } from "antd/lib/form/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordComponent = () => {
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const router = useRouter();
	const { token } = router.query;
	const [form] = useForm();

	const handleResetPassword = async (values: {
		newPassword: string;
		confirmPassword: string;
	}) => {
		if (values.newPassword !== values.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}

		try {
			if (token) {
				const res = await resetPassword({
					token: token as string,
					newPassword: values.newPassword,
				}).unwrap();
				toast.success(res.message);
				form.resetFields();
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className="w-1/2 flex items-center justify-center p-5">
			<Form
				form={form}
				onFinish={handleResetPassword}
				requiredMark={false}
				layout="vertical"
				className="w-full bg-white h-full p-10 rounded shadow-xl"
			>
				<h1 className="text-center text-2xl font-bold my-4">Reset Password</h1>
				<Form.Item
					name="newPassword"
					label="New Password"
					rules={[
						{
							required: true,
							message: "Please enter your new password",
						},
					]}
				>
					<Input.Password placeholder="Enter your new password" />
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					label="Confirm Password"
					rules={[
						{
							required: true,
							message: "Please confirm your password",
						},
					]}
				>
					<Input.Password placeholder="Confirm your new password" />
				</Form.Item>
				<Button
					loading={isLoading}
					className="my-3"
					htmlType="submit"
					type="primary"
					block
				>
					{isLoading ? "Resetting..." : "Reset"}
				</Button>
			</Form>
			<ToastContainer />
		</div>
	);
};

export default ResetPasswordComponent;
