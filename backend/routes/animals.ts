import { Router } from "express";
import { getDb } from "../db/connection";
import { ObjectId } from "mongodb";

const router = Router();

// GET all animals
router.get("/", async (_req, res) => {
  try {
    const db = await getDb();
    const animals = await db
      .collection("animals")
      .find()
      .sort({ commonName: 1 })
      .toArray();
    res.json(animals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch animals" });
  }
});

// GET animal by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const animal = await db.collection("animals").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch animal" });
  }
});

export default router;
