import { NextResponse } from "next/server";
import { getTaskById, updateTask, deleteTask } from "../../data/store";

// GET /api/tasks/:id - Get task by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = getTaskById(id);

  if (!task) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(task);
}

// PATCH /api/tasks/:id - Update task
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedTask = updateTask(id, body);

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }
}

// DELETE /api/tasks/:id - Delete task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteTask(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Task deleted" });
}
