import { NextResponse } from "next/server";
import { getTasks, createTask } from "../data/store";

// GET /api/tasks - Get all tasks
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const titleLike = searchParams.get("title_like");

  let tasks = getTasks();

  // Filter by status
  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  // Filter by title (case-insensitive search)
  if (titleLike) {
    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(titleLike.toLowerCase())
    );
  }

  return NextResponse.json(tasks);
}

// POST /api/tasks - Create new task
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, description, status, assignedUserId } = body;

    if (!title || !description || !status || !assignedUserId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTask = createTask({
      title,
      description,
      status,
      assignedUserId,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }
}
