import { Router } from "express";

import InputRoute from "./input.route";
import OutputRoute from "./output.route";
import InfoRoute from "./info.route";

const router = Router();

router.use("/input", InputRoute);
router.use("/output", OutputRoute);
router.use("/info", InfoRoute);

export default router;
