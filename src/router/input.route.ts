import { Router } from "express";
import { GetInputFiles, CreateInputFile } from "../controllers";

const router = Router();

router.get("/list", GetInputFiles);

router.post("/create", CreateInputFile);

export default router;
