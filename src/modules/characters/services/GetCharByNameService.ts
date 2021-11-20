import { Character } from ".prisma/client";

import prismaClient from "../../../prisma";

class GetCharByNameService {
    async execute(name: string): Promise<Character[]> {
        const char = await prismaClient.character.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
        });

        return char;
    }
}

export { GetCharByNameService };
