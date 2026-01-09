import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mywildiary";

const client = new MongoClient(uri);
let db: ReturnType<typeof client.db>;

export async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB");
  }
  return db;
}
