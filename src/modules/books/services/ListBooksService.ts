import { Book } from ".prisma/client";

import prismaClient from "../../../prisma";

class ListBooksService {
    async execute(): Promise<Book[]> {
        const books = prismaClient.book.findMany({
            orderBy: {
                released: "asc",
            },
        });

        return books;
    }
}

export { ListBooksService };
