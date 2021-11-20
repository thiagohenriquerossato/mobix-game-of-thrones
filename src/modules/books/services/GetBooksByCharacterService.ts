/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { Book } from ".prisma/client";

import prismaClient from "../../../prisma";

class GetBooksByCharacterService {
    async execute(character: string): Promise<Book[]> {
        const { books } = await prismaClient.character.findFirst({
            where: {
                name: {
                    contains: character,
                    mode: "insensitive",
                },
            },
            select: {
                books: true,
            },
        });
        const listBook: Book[] = [];
        for (let i = 0; i < books.length; i++) {
            const result = await prismaClient.book.findFirst({
                where: {
                    name: books[i],
                },
            });
            listBook.push(result);
        }

        return listBook;
    }
}

export { GetBooksByCharacterService };
