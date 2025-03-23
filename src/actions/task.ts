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
    description: formDate.get("description") as string,
    dueDate: formDate.get("dueDate") as string,
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

export const updateTask = async (
  id: string,
  state: FormState,
  formDate: FormData
) => {
  const updateTask: Task = {
    title: formDate.get("title") as string,
    description: formDate.get("description") as string,
    dueDate: formDate.get("dueDate") as string,
    isCompleted: Boolean(formDate.get("isCompleted")),
  };
  try {
    await connectDb();
    await TaskModel.updateOne({ _id: id }, updateTask);
  } catch (error) {
    state.error = "タスクの更新に失敗しました";
    return state;
  }

  redirect("/");
};

export const deleteTask = async (id: string, state: FormState) => {
  try {
    await connectDb();
    await TaskModel.deleteOne({ _id: id });
  } catch (error) {
    state.error = "タスクの削除に失敗しました";
    return state;
  }
  redirect("/");
};
