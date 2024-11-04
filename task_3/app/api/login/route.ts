import { NextResponse } from "next/server";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "1234";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", "dummy-token", {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
