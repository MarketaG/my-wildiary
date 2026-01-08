import "dotenv/config";
import {
  MongoClient,
  ObjectId,
  Db,
  Document,
  OptionalUnlessRequiredId,
} from "mongodb";
import * as fs from "fs";
import * as path from "path";

import {
  Animal,
  User,
  ObservationInput,
  Observation,
  AnimalDocument,
  IndexDefinition,
} from "../types/observations";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mywildiary";

// loads a JSON file from data/ folder
function loadJSON<T>(filename: string): T[] {
  const filePath = path.join(__dirname, "../data", filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T[];
}

// universal function for seeding a collection
async function seedCollection<T extends Document>(
  db: Db,
  collectionName: string,
  data: T[],
  indexes?: IndexDefinition
): Promise<(T & { _id: ObjectId })[]> {
  console.log(`\n Seeding ${collectionName}...`);
  const collection = db.collection<T>(collectionName);

  await collection.deleteMany({});
  const result = await collection.insertMany(
    data as OptionalUnlessRequiredId<T>[]
  );
  console.log(`Inserted ${result.insertedCount} documents`);

  if (indexes && Object.keys(indexes).length > 0) {
    await Promise.all(
      Object.entries(indexes).map(async ([field, options]) => {
        await collection.createIndex({ [field]: options });
        console.log(`Created index on '${field}'`);
      })
    );
  }

  const documents = await collection.find().toArray();
  return documents as (T & { _id: ObjectId })[];
}

// find animal ID by title keyword
function findAnimalId(
  title: string,
  animals: AnimalDocument[]
): ObjectId | undefined {
  const lowerTitle = title.toLowerCase();
  const foundAnimal = animals.find((animal) => {
    const firstWord = animal.commonName.toLowerCase().split(" ")[0];
    return lowerTitle.includes(firstWord);
  });
  return foundAnimal?._id;
}

// MAIN SEED FUNCTION
async function seed(): Promise<void> {
  const client = new MongoClient(uri);
  const startTime = Date.now();

  try {
    console.log("Starting database seeding...");
    console.log(`Connecting to: ${uri.replace(/\/\/.*@/, "//<credentials>@")}`);

    await client.connect();
    const db: Db = client.db();

    // seed animals and users in parallel
    const [animals, users] = await Promise.all([
      seedCollection<Animal>(db, "animals", loadJSON<Animal>("animals.json"), {
        commonName: "text",
      }),
      seedCollection<User>(db, "users", loadJSON<User>("users.json")),
    ]);

    // seed observations
    const observationsInput = loadJSON<ObservationInput>("observations.json");

    const observations: Observation[] = observationsInput.map((obs, index) => ({
      ...obs,
      userId: users[index % users.length]._id,
      animalId: findAnimalId(obs.title, animals),
    }));

    await seedCollection<Observation>(db, "observations", observations, {
      title: "text",
    });

    // summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log("\n Database seeding completed successfully!");
    console.log("==========================================");
    console.log(`Summary:`);
    console.log(`    Animals:      ${animals.length}`);
    console.log(`    Users:        ${users.length}`);
    console.log(`    Observations: ${observations.length}`);
    console.log(`    Duration:     ${duration}s`);
    console.log("");
    console.log("Seeded animals:");
    animals.forEach((animal) => {
      console.log(`   - ${animal.commonName} (${animal.species})`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n Database connection closed");
  }
}

seed();
