import React from "react";
import ForgotPassword from "@components/auth/ForgotPassword";
import AuthLayout from "@layout/authLayout";

const page = () => {
	return (
		<AuthLayout>
			<ForgotPassword />
		</AuthLayout>
	);
};

export default page;
