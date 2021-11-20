import { Request, Response } from "express";

import { ListCharactersService } from "../services/ListCharactersService";

class ListCharactersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = new ListCharactersService();

        try {
            const result = await service.execute();

            return response.json(result);
        } catch (error) {
            return response.json(error);
        }
    }
}

export { ListCharactersController };
