import mongoose from "mongoose";

const connectDB = async (MONGO_URI: string) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    // Safely access the native database object
    const db = mongoose.connection.db;
    if (db) {
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map((c) => c.name);
      console.log(
        `Existing collections: ${collectionNames.length ? collectionNames.join(", ") : "none"}`,
      );
    } else {
      console.warn(
        "Database object not yet available – skipping collection list",
      );
    }

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
