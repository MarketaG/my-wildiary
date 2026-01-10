import { Router } from "express";
import { getDb } from "../db/connection";
import { ObjectId } from "mongodb";

const router = Router();

// GET all observations (with animals and users population)
router.get("/", async (_req, res) => {
  try {
    const db = await getDb();
    const observations = await db
      .collection("observations")
      .aggregate([
        {
          $lookup: {
            from: "animals",
            localField: "animalId",
            foreignField: "_id",
            as: "animal",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: { path: "$animal", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    res.json(observations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch observations" });
  }
});

// GET single observation by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const observation = await db
      .collection("observations")
      .aggregate([
        {
          $match: { _id: new ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "animals",
            localField: "animalId",
            foreignField: "_id",
            as: "animal",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: { path: "$animal", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
      ])
      .toArray();

    if (observation.length === 0) {
      return res.status(404).json({ error: "Observation not found" });
    }

    res.json(observation[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch observation" });
  }
});

// POST new observation
router.post("/", async (req, res) => {
  try {
    const db = await getDb();

    // validation of animalId and userId if provided
    if (req.body.animalId) {
      req.body.animalId = new ObjectId(req.body.animalId);
    }
    if (req.body.userId) {
      req.body.userId = new ObjectId(req.body.userId);
    }

    const observation = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await db.collection("observations").insertOne(observation);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create observation" });
  }
});

// DELETE observation by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.collection("observations").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Observation not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete observation" });
  }
});

// UPDATE observation by ID
router.put("/:id", async (req, res) => {
  try {
    const db = await getDb();

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      habitat: req.body.habitat,
      weather: req.body.weather,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      imageUrl: req.body.imageUrl || "",
      animalId: req.body.animalId ? new ObjectId(req.body.animalId) : undefined,
    };

    const result = await db
      .collection("observations")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Observation not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update observation" });
  }
});

// GET search observations
router.get("/search", async (req, res) => {
  try {
    const db = await getDb();
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const observations = await db
      .collection("observations")
      .aggregate([
        {
          $search: {
            index: "observations_search",
            text: {
              query: query,
              path: ["title", "description"],
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        {
          $lookup: {
            from: "animals",
            localField: "animalId",
            foreignField: "_id",
            as: "animal",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: { path: "$animal", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
      ])
      .toArray();

    res.json(observations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search observations" });
  }
});

export default router;
