import { Router } from "express";

import { GetBookByNameController } from "../modules/books/controllers/GetBookByNameController";
import { GetBooksByCharacterController } from "../modules/books/controllers/GetBooksByCharacterController";
import { ListBooksController } from "../modules/books/controllers/ListBooksController";

const bookRoutes = Router();

bookRoutes.get("/", new ListBooksController().handle);

bookRoutes.get("/:name", new GetBookByNameController().handle);

bookRoutes.get(
    "/character/:character",
    new GetBooksByCharacterController().handle
);

export { bookRoutes };
