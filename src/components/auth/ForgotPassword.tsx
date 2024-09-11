import { Button, Form, Input } from "antd";
import { useState } from "react";

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false);

	const handleForgotPassword = () => {
		setLoading(true);
		console.log("Done");
		setLoading(false);
	};
	return (
		<div className="w-1/2 h-96 flex items-center justify-center p-5 ">
			<Form
				onFinish={handleForgotPassword}
				requiredMark={false}
				layout="vertical"
				className="w-full bg-white h-full p-10 rounded shadow-xl"
			>
				<h1 className="text-center text-2xl font-bold my-4">Forgot password</h1>
				<Form.Item
					name="forgotPassword"
					label="Email"
					rules={[
						{
							required: true,
						},
						{ type: "email", message: "Please enter your email address" },
					]}
				>
					<Input placeholder="Enter your email address" />
				</Form.Item>
				<Button
					loading={loading}
					className="my-3"
					htmlType="submit"
					type="primary"
					block
				>
					send
				</Button>
			</Form>
		</div>
	);
};

export default ForgotPassword;
