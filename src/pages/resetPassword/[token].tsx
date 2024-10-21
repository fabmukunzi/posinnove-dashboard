import ResetPasswordComponent from "@components/auth/ResetPasswordComponent";
import AuthLayout from "@layout/authLayout";
import React from "react";

const ResetPassword = () => {
	return (
		<AuthLayout>
			<ResetPasswordComponent />
		</AuthLayout>
	);
};

export default ResetPassword;
