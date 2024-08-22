import mongoose from "mongoose";

let isConnect = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnect) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "origin",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
