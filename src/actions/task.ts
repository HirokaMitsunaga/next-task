"use server";

import { Task, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { redirect } from "next/navigation";

//SAで失敗した時の型定義
export interface FormState {
  error: string;
}

export const createTask = async (state: FormState, formDate: FormData) => {
  const newTask: Task = {
    title: formDate.get("title") as string,
    description: formDate.get("title") as string,
    dueDate: formDate.get("title") as string,
    isCompleted: false,
  };
  try {
    await connectDb();
    await TaskModel.create(newTask);
  } catch (error) {
    state.error = "タスクの作成に失敗しました";
    return state;
  }

  redirect("/");
};
