import { NextResponse } from "next/server";

export default function middleware(req: any) {
	const token = req.cookies.get("Idea-17dc1871");

	if (!token) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"],
};
