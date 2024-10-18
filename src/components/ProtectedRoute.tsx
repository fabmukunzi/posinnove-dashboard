import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetProfileQuery } from "@store/actions/auth";
import { HashLoader } from "react-spinners";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isLoading } = useGetProfileQuery({});
	const router = useRouter();
	const { token } = useSelector((state: RootState) => state.appReducer);

	useEffect(() => {
		if (!isLoading && !token) {
			router.push("/login");
		}
	}, [isLoading, token, router]); 
	if (isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center fixed inset-0">
				<HashLoader color="#0a418a" size={80} speedMultiplier={1.2} />
			</div>
		);
	}

	if (!token) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
