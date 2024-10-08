import { NextResponse } from "next/server";

export default function middleware(req: any) {
	const token = req.cookies.get("Idea-17dc1871");
	console.log(token);
	


	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"],
};
