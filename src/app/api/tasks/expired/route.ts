import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();
    const jstDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
    );
    const today = jstDate.toISOString().split("T")[0];
    const expiredTasks: TaskDocument[] = await TaskModel.find({
      dueDate: { $lt: today },
      isCompleted: false,
    });

    return NextResponse.json({
      message: "タスク取得成功",
      tasks: expiredTasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
