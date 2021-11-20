import { Router } from "express";

import { GetCharByNameController } from "../modules/characters/controllers/GetCharByNameController";
import { ListCharactersController } from "../modules/characters/controllers/ListCharactersController";

const characterRoutes = Router();

characterRoutes.get("/", new ListCharactersController().handle);

characterRoutes.get("/:name", new GetCharByNameController().handle);

export { characterRoutes };
