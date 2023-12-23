import { MongoClient } from "mongodb";

async function connectToDatabase(cluster: string) {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    return database.collection(cluster);
  } catch (error) {
    throw error;
  }
}

export default connectToDatabase;
