import { Request, Response } from "express";

import { ListBooksService } from "../services/ListBooksService";

class ListBooksController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = new ListBooksService();
        try {
            const result = await service.execute();
            return response.json(result);
        } catch (error) {
            return response.json(error);
        }
    }
}

export { ListBooksController };
