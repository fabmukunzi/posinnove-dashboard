"use client";

import { useLoginMutation } from "@store/actions/auth";
import { setToken } from "@store/reducers/app";
import decodeToken from "@utils/auth/decodeUser";
import { setCookie } from "@utils/cookies";
import { logo } from "@utils/images";
import { Button, Checkbox, Form, Input, Typography, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
	const { Title } = Typography;
	const [login, { isLoading }] = useLoginMutation();
	const { push } = useRouter();
	const dispatch = useDispatch();
	const handleLogin = async (values: any) => {
		try {
			const { data } = await login(values).unwrap();

			const decoded = decodeToken(data.token);
			// setCookie("access_token", data?.token);
			dispatch(setToken(data.token));
			if (decoded) {
				toast.success("Login success");
				setTimeout(() => {
					push("/");
				}, 3000);
			} else {
				push("/");
			}
		} catch (error: any) {
			console.log(error, "errrrrr");
			notification.error({
				message: error?.data?.message,
			});
		}
	};
	return (
		<>
			<ToastContainer />
			<div className="flex flex-col items-center justify-center -mt-20 md:mt-0">
				<Image src={logo} alt="logo" className="md:hidden" />
				<Title level={2} className="text-primary font-semibold">
					Login
				</Title>
				<Form
					onFinish={handleLogin}
					requiredMark={false}
					layout="vertical"
					className="md:w-1/2 w-[80%]"
				>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
							},
							{ type: "email", message: "Please enter a valid email" },
						]}
					>
						<Input placeholder="Enter your email" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
							},
							{ min: 6, message: "Password must be atleast 6 characters" },
						]}
					>
						<Input.Password placeholder="Enter your password" />
					</Form.Item>
					<div className="flex justify-between">
						<Form.Item name="remember" className="flex items-start my-0">
							<Checkbox>Remember Me</Checkbox>
						</Form.Item>
						<Link href="/forgot-password" className="text-primary">
							Forgot Password?
						</Link>
					</div>
					<Button
						loading={isLoading}
						className="my-3"
						htmlType="submit"
						type="primary"
						block
					>
						Login
					</Button>
					<Title
						level={5}
						className="font-normal flex items-center justify-center gap-1"
					>
						I don’t have an account?{" "}
						<Link href="/signup" className="text-primary font-medium">
							Signup
						</Link>
					</Title>
				</Form>
			</div>
		</>
	);
};

export default LoginComponent;
