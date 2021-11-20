import { Request, Response } from "express";

import { GetBooksByCharacterService } from "../services/GetBooksByCharacterService";

class GetBooksByCharacterController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { character } = request.params;

        const service = new GetBooksByCharacterService();

        try {
            const result = await service.execute(character);
            return response.json(result);
        } catch (error) {
            return response.json(error);
        }
    }
}

export { GetBooksByCharacterController };
