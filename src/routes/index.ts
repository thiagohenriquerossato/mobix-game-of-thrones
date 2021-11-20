import { Router } from "express";

import { bookRoutes } from "./books.routes";
import { characterRoutes } from "./characters.routes";

const router = Router();

router.use("/books", bookRoutes);

router.use("/characters", characterRoutes);

export { router };
