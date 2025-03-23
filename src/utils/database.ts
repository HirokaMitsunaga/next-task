import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect((process.env.DB_URI as string) || "");
  } catch (e) {
    console.log("DB接続に失敗しました");
    throw new Error();
  }
};
