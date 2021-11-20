import { Request, Response } from "express";

import { GetCharByNameService } from "../services/GetCharByNameService";

class GetCharByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;

        const service = new GetCharByNameService();

        try {
            const result = await service.execute(name);
            return response.json(result);
        } catch (error) {
            return response.json(error);
        }
    }
}

export { GetCharByNameController };
