import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "BackendApi",
    })
    .then(() => {
      console.log("Connected To the Database");
    })
    .catch((err) => {
      console.log(err);
    });
}