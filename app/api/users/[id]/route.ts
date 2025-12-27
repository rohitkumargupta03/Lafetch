import { NextResponse } from "next/server";
import { getUserById } from "../../data/store";

// GET /api/users/:id - Get user by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  // Remove password from response
  const { password, ...safeUser } = user;
  return NextResponse.json(safeUser);
}
