import jwt from "jsonwebtoken";

const decodeToken = (token: string): any => {
	try {
		const decoded = jwt.decode(token);
		return decoded;
	} catch (error) {
		console.error("Failed to decode token", error);
		return null;
	}
};

export default decodeToken;
