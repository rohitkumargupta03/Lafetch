import { NextResponse } from "next/server";
import { getUsers, getUserByEmail } from "../data/store";

// GET /api/users - Get all users
export async function GET() {
  const users = getUsers();
  // Remove passwords from response
  const safeUsers = users.map(({ password, ...safeUser }) => safeUser);
  return NextResponse.json(safeUsers);
}

// POST /api/users - Login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = getUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a mock token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      token,
      user: safeUser,
    });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
