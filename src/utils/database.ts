import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error("DB_URIが設定されていません");
    }
    await mongoose.connect(process.env.DB_URI);
    console.log("DB接続に成功しました");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
