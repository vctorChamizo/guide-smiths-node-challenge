import { Router } from "express";
import { GetLostRobot, GetGridExplore } from "../controllers";

const router = Router();

router.get("/robots", GetLostRobot);

router.get("/explore", GetGridExplore);

export default router;
