import { Router } from "express";
import { createSimulation, getSimulations } from "../controllers/simulationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createSimulation);
router.get("/", authMiddleware, getSimulations);

export default router;