import { useForgotPasswordMutation } from "@store/actions/auth";
import { Button, Form, Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
	const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); // Use the mutation hook

	const handleForgotPassword = async (values: { forgotPassword: string }) => {
		try {
			// Call the mutation and pass the form data
			const res = await forgotPassword({
				email: values.forgotPassword,
			}).unwrap();
			toast.success(res.message);
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className="lg:w-3/4 w-full flex items-center justify-center p-5">
				<Form
					onFinish={(values) => handleForgotPassword(values)}
					requiredMark={false}
					layout="vertical"
					className="w-full bg-white h-full p-10 rounded shadow-xl"
				>
					<h1 className="text-center text-2xl font-bold my-4">
						Forgot password
					</h1>
					<Form.Item
						name="forgotPassword"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please enter your email address",
							},
							{ type: "email", message: "Please enter a valid email address" },
						]}
					>
						<Input placeholder="Enter your email address" />
					</Form.Item>
					<Button
						loading={isLoading}
						className="my-3"
						htmlType="submit"
						type="primary"
						block
					>
						Send
					</Button>
				</Form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default ForgotPassword;
