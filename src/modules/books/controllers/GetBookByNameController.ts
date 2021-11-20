import { Request, Response } from "express";

import { GetBookByNameService } from "../services/GetBookByNameService";

class GetBookByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;

        const service = new GetBookByNameService();

        try {
            const result = await service.execute(name);
            return response.json(result);
        } catch (error) {
            return response.json(error);
        }
    }
}

export { GetBookByNameController };
