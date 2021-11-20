import { Character } from ".prisma/client";

import prismaClient from "../../../prisma";

class ListCharactersService {
    async execute(): Promise<Character[]> {
        const characters = prismaClient.character.findMany({
            orderBy: {
                name: "asc",
            },
        });

        return characters;
    }
}

export { ListCharactersService };
