import { Router } from "express";
import { getDb } from "../db/connection";
import { ObjectId } from "mongodb";

const router = Router();

// GET > all observations
router.get("/", async (_req, res) => {
  try {
    const db = await getDb();
    const observations = await db.collection("observations").find().toArray();
    res.json(observations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch observations" });
  }
});

// POST – adding a new observation
router.post("/", async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.collection("observations").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create observation" });
  }
});

// DELETE – delete observation by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.collection("observations").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(204).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete observation" });
  }
});

export default router;
